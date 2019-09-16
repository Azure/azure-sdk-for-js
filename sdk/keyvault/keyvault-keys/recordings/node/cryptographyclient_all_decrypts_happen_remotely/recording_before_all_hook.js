let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create')
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
  'westus2',
  'x-ms-request-id',
  '3dfa7bed-97c3-4641-8d1d-10e8346dfb65',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 17:47:47 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  'c18c12e8-2ea7-41c8-8226-c1ec77de4400',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Al3UndLr4mdGj2jDtnx-ME2p4MoTAQAAAMTBEdUOAAAA; expires=Wed, 16-Oct-2019 17:47:49 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 17:47:48 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/be40a93493284811a40e8c9c09b9bf9d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xhUpdMS3Ys7R-JmXkGZM2PaUpWu_WuMhKwYvGrCb-2GTFG0NO9CpjsTq6LPSCDk74dMaJHlniLOOnoacE6x4FxsfvEFi0Z9oAn54SNBrYFsJRaVM3PmN1n6DU_lLsST0fuEYnUER59log9VK6l-5zv90-JhfnDAXil9UCp0lXiTD4Ym3s1Z1mTGJME2ztLELk6xomUyVIRmsSeawFc_SpCP0ynmKVi-UN1x72p996Rqv6zfTcOve7EQZtPfd9_R2Hq47CtqXmEYUBx2C0FhNb-ouAdTRLQPOY4YeDjBSmeSTx80xjCUAhmIMoCyADcZJpcVMKnxh97TohpGEahIbIw","e":"AQAB"},"attributes":{"enabled":true,"created":1568656070,"updated":1568656070,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  '6e121698-786c-4139-968d-383729fef599',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 17:47:50 GMT',
  'Connection',
  'close',
  'Content-Length',
  '694'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/be40a93493284811a40e8c9c09b9bf9d')
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
  'westus2',
  'x-ms-request-id',
  '61498486-e7f5-47b4-90f6-3be774425068',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 17:47:50 GMT',
  'Connection',
  'close'
]);


nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
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
  '09f9f762-7e96-45cb-b965-37b797604300',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Al3UndLr4mdGj2jDtnx-ME2p4MoTAgAAAMTBEdUOAAAA; expires=Wed, 16-Oct-2019 17:47:52 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 17:47:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/be40a93493284811a40e8c9c09b9bf9d')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/be40a93493284811a40e8c9c09b9bf9d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xhUpdMS3Ys7R-JmXkGZM2PaUpWu_WuMhKwYvGrCb-2GTFG0NO9CpjsTq6LPSCDk74dMaJHlniLOOnoacE6x4FxsfvEFi0Z9oAn54SNBrYFsJRaVM3PmN1n6DU_lLsST0fuEYnUER59log9VK6l-5zv90-JhfnDAXil9UCp0lXiTD4Ym3s1Z1mTGJME2ztLELk6xomUyVIRmsSeawFc_SpCP0ynmKVi-UN1x72p996Rqv6zfTcOve7EQZtPfd9_R2Hq47CtqXmEYUBx2C0FhNb-ouAdTRLQPOY4YeDjBSmeSTx80xjCUAhmIMoCyADcZJpcVMKnxh97TohpGEahIbIw","e":"AQAB"},"attributes":{"enabled":true,"created":1568656070,"updated":1568656070,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  'f44f06dc-8f8a-4a8c-9db3-cbc9fe99a52a',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 17:47:52 GMT',
  'Connection',
  'close',
  'Content-Length',
  '694'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/be40a93493284811a40e8c9c09b9bf9d/decrypt')
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
  'westus2',
  'x-ms-request-id',
  '656da689-3b9f-4847-8c40-311ca0b2aceb',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 17:47:54 GMT',
  'Connection',
  'close'
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
  '63a15c3f-4fe3-4290-8dd4-098ae7064500',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Al3UndLr4mdGj2jDtnx-ME2p4MoTAwAAAMTBEdUOAAAA; expires=Wed, 16-Oct-2019 17:47:55 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 17:47:55 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/be40a93493284811a40e8c9c09b9bf9d/decrypt', {"alg":"RSA1_5","value":"dMvOumdcgnLdlNK_3LVkkP_qouALZAF2rrYmzGiLobfL5PcrwWSTnVKlDk4KrnoUFtCFvk_-Ii3Gl8CVEG9HQmEyfP5F_YGZ0Uu_p5CEwXCSWmuKrU4vK-GC0psoRUZc3P3Dcn-zQhRztKwUQAA98GeauhxJc5Tmn8QMMDZ5MXChQy03P3eN8k062b4mowFyD7VifoPXQz2QGHksfbVsdNT_j0QzZmrRu5oxpaQ2BKJyzKO_jMboICgt8Y-Wf6ED2m26VyRF7EK5J2DS7TlptlYjgemtAXBey80r3TFCpausp1ihPxiY5fp8Cqr7ope00CVTcy9GhaBiR8SHkH3TPw"})
  .query(true)
  .reply(403, {"error":{"code":"Forbidden","message":"Operation is not allowed.\r\nOperation: \"decrypt\"\r\nCaller: appid=azure_client_id;oid=01111cf6-e558-4db5-b03e-b0154730395a;numgroups=0;iss=https://sts.windows.net/azure_tenant_id/\r\nVault: keyvault_name;location=westus2","innererror":{"code":"ForbiddenByPolicy"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '355',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '18a929ac-bd11-4db2-bd6b-03d14db442d6',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 17:47:56 GMT',
  'Connection',
  'close'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
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
  'westus2',
  'x-ms-request-id',
  '5e7eba2f-43bc-4643-bab2-9ccdf165e8cb',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 17:47:56 GMT',
  'Connection',
  'close'
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
  '0fc90094-3914-4a88-b5fa-19b584cc4600',
  'x-ms-ests-server',
  '2.1.9368.8 - EAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Al3UndLr4mdGj2jDtnx-ME2p4MoTBAAAAMTBEdUOAAAA; expires=Wed, 16-Oct-2019 17:47:58 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 17:47:58 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1568656079,"scheduledPurgeDate":1576432079,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/be40a93493284811a40e8c9c09b9bf9d","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xhUpdMS3Ys7R-JmXkGZM2PaUpWu_WuMhKwYvGrCb-2GTFG0NO9CpjsTq6LPSCDk74dMaJHlniLOOnoacE6x4FxsfvEFi0Z9oAn54SNBrYFsJRaVM3PmN1n6DU_lLsST0fuEYnUER59log9VK6l-5zv90-JhfnDAXil9UCp0lXiTD4Ym3s1Z1mTGJME2ztLELk6xomUyVIRmsSeawFc_SpCP0ynmKVi-UN1x72p996Rqv6zfTcOve7EQZtPfd9_R2Hq47CtqXmEYUBx2C0FhNb-ouAdTRLQPOY4YeDjBSmeSTx80xjCUAhmIMoCyADcZJpcVMKnxh97TohpGEahIbIw","e":"AQAB"},"attributes":{"enabled":true,"created":1568656070,"updated":1568656070,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'westus2',
  'x-ms-request-id',
  'a12898e4-cf26-4f78-acfa-026a4a5eed8a',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 17:47:58 GMT',
  'Connection',
  'close',
  'Content-Length',
  '863'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
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
  'westus2',
  'x-ms-request-id',
  'b91ec828-69f6-4479-904f-1e8453ef3fcf',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 17:47:59 GMT',
  'Connection',
  'close'
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
  '4f3dd40b-06d1-4d66-af95-ad43d7324200',
  'x-ms-ests-server',
  '2.1.9368.8 - SEAS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Al3UndLr4mdGj2jDtnx-ME2p4MoTBQAAAMTBEdUOAAAA; expires=Wed, 16-Oct-2019 17:48:01 GMT; path=/; secure; HttpOnly',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; HttpOnly',
  'Date',
  'Mon, 16 Sep 2019 17:48:01 GMT',
  'Connection',
  'close',
  'Content-Length',
  '1231'
]);


nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(403, {"error":{"code":"Forbidden","message":"Operation is not allowed.\r\nOperation: \"purge\"\r\nCaller: appid=azure_client_id;oid=01111cf6-e558-4db5-b03e-b0154730395a;numgroups=0;iss=https://sts.windows.net/azure_tenant_id/\r\nVault: keyvault_name;location=westus2","innererror":{"code":"ForbiddenByPolicy"}}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '353',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '53e9949f-f69e-464d-a0b0-5c50d6fe3974',
  'x-ms-keyvault-service-version',
  '1.1.0.878',
  'x-ms-keyvault-network-info',
  'addr=122.58.248.136;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 16 Sep 2019 17:48:01 GMT',
  'Connection',
  'close'
]);


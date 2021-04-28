let nock = require('nock');

module.exports.hash = "850292018022c6b56baa10f4c5d147d2";

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
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e5fc939c-9435-4eab-9478-aba84b041842',
  'x-ms-request-id',
  'e2c7b478-dd6d-47a5-be8b-2ffa1b31f00c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:25 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azure_tenant_id/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '67bd8ad2-dffb-4586-a916-a676745e4c00',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6UxAAAABnvxvYDgAAAA; expires=Fri, 28-May-2021 20:46:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrVCRmKn09v1_7UqJoRcfjJIu3yEpFBer5Pm719ypV_vxR4Zykmil6IwmF9qsYCXYbF6TEEHksxfgSpmwqAGmmSU0anAocMCfqQVOP6vtx7QrKcsQYg8jdbgpSeKmfD9qO1l8lxMj3IFWOGqoQKHJglX-n3soGDkyKk0Ig2v3aVHAgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:46:25 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/azure_tenant_id/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/azure_tenant_id/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/azure_tenant_id/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/azure_tenant_id/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  '8b66ecff-8977-4519-afc6-c73464b34701',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6UxAAAABnvxvYDgAAAA; expires=Fri, 28-May-2021 20:46:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXa9wQS-TdV7vMDqGBuoa64Xshn14gKSoyxh5xXv_if34SMyaa-jabPI5lB7Gf_0UBQN-6_rq3y9u8flrWJQTwZ8seX5niqHliGf2VrvNDC_JlGIbMc7JlMpn74QdBx-32ZK8SBjTIBXyCaxFB2zHMZHMNqBVqW8waJhGpZtznUEgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:46:25 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/azure_tenant_id/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  'f9700ae9-3cae-4c74-a2b2-e2b3175bac01',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6UwwAAACTwBvYDgAAAA; expires=Fri, 28-May-2021 20:46:26 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:46:25 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/fd55ff40f7c241b780da6d46ede110ac","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0KT6RQ-A8UHplNIcUMFaMd3mKsFqiZ1YTnFTKwiRJhX1l9l4_VvLji8cLpNcU4kenn0qbjqumRXrUIn5fqOP-VzqfkFKBkyl_zqtvVOtNrvyQnxvK8_PXsfU9vJ7DJdrQPhX33lrNKZbPA9lCsNlxO2sdLh22rYOUIGRUleL5qRn0hZ8eVYVXRwXWSua0ZE4rZpKmuzR6PxXsa30jSVNzdv2svKx7cPmoYw1KkQrQGn1r4aYdP7LX9Zx3Exc6Lh-rwhigN5uPhiv-e68vVLZsaDkvITq-G601FWNnbMDXawiHonFkmRk9yNi5Qx4T9MUT0k2tJMPUdPeCgPsT8oAUQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642786,"updated":1619642786,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'e5fc939c-9435-4eab-9478-aba84b041842',
  'x-ms-request-id',
  'e6971e38-3623-474d-8fe3-b3b3ac11210e',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:26 GMT',
  'Content-Length',
  '715'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-/c68eff152f824c20a56728bf011e227f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0MqseUI2rGFey3O4O_Cev7slpS1QbgqWV9N-3JX-vg74aLjQ6iSD9lgB1L6jCTcw5ufYxsZFhnWYjcttkMirUrdnI6m2KL8Z0m2x_KLBC9OZTmQ4zQ4H98GrxAKg6NRWKzfx5-yyvoo3WearB3wB_B-oNTC-Hl1qNPgsAzwCRPOt_AKbWYeee3LV9CXo_XlEXn9gvrl8y7_eL5R-Vxoe1wUravBHUnqPEn3EMrhaSBXfbr8p67D9AT6t_mzP16spkw4nlbQ8ZbWeYb9p8351d30GiTxfwp2Xwvh9EqW-yszS_GzOBwBhu_oqXIc9dug_jzkOKNJ_VtEwL9zgrK4fTQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642786,"updated":1619642786,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '0dd6f493-8823-42b7-8be5-bcab6512d397',
  'x-ms-request-id',
  'faa4f1ec-c092-42db-ae50-a8a3bd4429c8',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:26 GMT',
  'Content-Length',
  '765'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-/c68eff152f824c20a56728bf011e227f/decrypt')
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
  'x-ms-client-request-id',
  '0810a854-5f51-40ff-bbb5-0591f61766f3',
  'x-ms-request-id',
  'b7e281e1-5844-4b03-a318-add7a36906ba',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-/c68eff152f824c20a56728bf011e227f/decrypt', {"alg":"RSA1_5","value":"WYuAhDx9avpM7RuJoqW1wR18-9FlhChro4xXknPyMHPmZBboUscMjI0u5Lt8TLk7VhXJKxD0pef2FbdHYI_eYNWo70n5-YJSRqx6vfY9Jb-yaWYcUdFn-tXpgGWG-Dy7tpAtR4RANYTIk9JoZWPoX5o2eIOtWD_VPwDo6KIVm3aYUcEDdTy-kROL-tw6lkaP2giCOIveHhE49SwtIxzxdKCkmDv_4ueORzO8hK3AwweT1Z7xFRpM29Uj4pMOmp5Mr7zUm6J0WzaHTENS7Pv1mbEdG-Lz2Pd7NKvRdKgXYuPoDLneUoAx11X-X6Z4YlYBtw66zo7l3sYxMSv-QgGxdQ"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-/c68eff152f824c20a56728bf011e227f","value":"dGhlIENyeXB0b2dyYXBoeUNsaWVudCBjYW4gYmUgY3JlYXRlZCBmcm9tIGEgZnVsbCBLZXlWYXVsdEtleSBvYmplY3Q"}, [
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
  '0810a854-5f51-40ff-bbb5-0591f61766f3',
  'x-ms-request-id',
  '0bcefa46-f241-4422-8046-96eecc1f9b6c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:26 GMT',
  'Content-Length',
  '275'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1619642787,"scheduledPurgeDate":1620247587,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/fd55ff40f7c241b780da6d46ede110ac","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0KT6RQ-A8UHplNIcUMFaMd3mKsFqiZ1YTnFTKwiRJhX1l9l4_VvLji8cLpNcU4kenn0qbjqumRXrUIn5fqOP-VzqfkFKBkyl_zqtvVOtNrvyQnxvK8_PXsfU9vJ7DJdrQPhX33lrNKZbPA9lCsNlxO2sdLh22rYOUIGRUleL5qRn0hZ8eVYVXRwXWSua0ZE4rZpKmuzR6PxXsa30jSVNzdv2svKx7cPmoYw1KkQrQGn1r4aYdP7LX9Zx3Exc6Lh-rwhigN5uPhiv-e68vVLZsaDkvITq-G601FWNnbMDXawiHonFkmRk9yNi5Qx4T9MUT0k2tJMPUdPeCgPsT8oAUQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642786,"updated":1619642786,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '59e5f322-5a60-4530-8b85-c80f5157f005',
  'x-ms-request-id',
  '6a178e14-cf76-47a2-a695-9b39edc25989',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:26 GMT',
  'Content-Length',
  '875'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f8d8e079-08b5-4238-b71d-42b185ed25a8',
  'x-ms-request-id',
  '0bfaec53-c4a0-4070-995e-b5fb03cc9ab5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:27 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '8d5c824e-b766-4a84-b3dd-d86719915a3d',
  'x-ms-request-id',
  '76afcb56-4990-453c-a31f-f1345c90fd7c',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f5240dc8-c551-4fa0-b838-3d241bbd3047',
  'x-ms-request-id',
  'c251eb01-1253-4a77-a864-48dda569fe15',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:29 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '08fd5457-c7c3-48fe-a82d-28329f6d55eb',
  'x-ms-request-id',
  '14f36518-81b6-42bc-89dc-abeddb8b7ce6',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:30 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '108',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '46a06c46-dacc-458a-9695-5d1371a0dbf7',
  'x-ms-request-id',
  '33764e69-9f25-4efd-adfd-aeed52f8fab5',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1619642787,"scheduledPurgeDate":1620247587,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/fd55ff40f7c241b780da6d46ede110ac","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0KT6RQ-A8UHplNIcUMFaMd3mKsFqiZ1YTnFTKwiRJhX1l9l4_VvLji8cLpNcU4kenn0qbjqumRXrUIn5fqOP-VzqfkFKBkyl_zqtvVOtNrvyQnxvK8_PXsfU9vJ7DJdrQPhX33lrNKZbPA9lCsNlxO2sdLh22rYOUIGRUleL5qRn0hZ8eVYVXRwXWSua0ZE4rZpKmuzR6PxXsa30jSVNzdv2svKx7cPmoYw1KkQrQGn1r4aYdP7LX9Zx3Exc6Lh-rwhigN5uPhiv-e68vVLZsaDkvITq-G601FWNnbMDXawiHonFkmRk9yNi5Qx4T9MUT0k2tJMPUdPeCgPsT8oAUQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642786,"updated":1619642786,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '9cea4b25-ddc1-4835-9429-68695d329fca',
  'x-ms-request-id',
  'ea7057ff-156e-4ddd-865e-d57cc4659990',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:35 GMT',
  'Content-Length',
  '875'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd2d33038-2ed3-4225-9527-292800f386d1',
  'x-ms-request-id',
  'fb6c6103-47ac-497b-b174-790ae9334944',
  'x-ms-keyvault-service-version',
  '1.2.265.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 28 Apr 2021 20:46:35 GMT'
]);

let nock = require('nock');

module.exports.hash = "e3c2db4a95a38acc4a488025f882f46e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-PS512-/create')
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
  'westus2',
  'x-ms-client-request-id',
  '943c7b52-4891-4e9f-b1f9-f30ba6963322',
  'x-ms-request-id',
  '55a26465-a84e-40d8-b141-b8dba1337c1c',
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
  'Wed, 28 Apr 2021 21:36:36 GMT'
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
  '6f4f2f2a-d915-4014-861f-8e3e9f594500',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6UxQAAABPyxvYDgAAAA; expires=Fri, 28-May-2021 21:36:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevrc7CssH5rWT6rsjWvyDqwD_IevydjAYwMRKAtvWFzJYsadm2ZDlWzBsvl7Wo7mCd8G1jsFILeO7gEFSgFeF3LnJkapNRUeV0yW3bx8uJrQecUxuUUnuHaknkMgMogDPguQwsWG8KOy2VNCvQRp5pEY_eqM8_5kw_PeDYXgHX9H5sgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:36:37 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/12345678-1234-1234-1234-123456789012/v2.0/.well-known/openid-configuration')
  .reply(200, {"token_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/authorize","device_authorization_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":"WW","cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}, [
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
  'e87435ef-c35e-4fcd-ae69-757523a15d01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6UxQAAABPyxvYDgAAAA; expires=Fri, 28-May-2021 21:36:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrXY_n4Ho1-lqgevgiYfkt0UV-TIodVc9FwiAetAicBCsFHPPWl0U-zl-L9jIpdtswXxa3gTDlOD6lkkpJjEzoowQvQ8gRl4otkh0ilmrNC0INvDMyT98xEAJJq34BaN3Az3oImfqAi-QniT_KUxJdDznQDrdwewkfu21uxYBOk8ogAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:36:37 GMT',
  'Content-Length',
  '1651'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .filteringRequestBody(function (body) {
            return body.replace(/client-request-id=[^&]*/g, "client-request-id=client-request-id");
        })
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "client_id=azure_client_id&scope=https%3A%2F%2Fvault.azure.net%2F.default%20openid%20profile%20offline_access&grant_type=client_credentials&client-request-id=client-request-id&client_secret=azure_client_secret")
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
  '896d973a-f895-4e3b-a41c-2a6fd6e66801',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=Au5BirxN9hhJvoEMGUBOFo6nSoKIAwAAABvKG9gOAAAA4BL6UxQAAABPyxvYDgAAAA; expires=Fri, 28-May-2021 21:36:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 21:36:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-PS512-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS512-/6926155f18fe4413ba4c7ad1988ae0d8","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mkih3bWfkeWQzjb4898XWjxQzm5HBU4CNBSJyPXn6dtub--RISylaWfEzxYivrH1c8gbAinMJFvTVNx5ca_rE53lvEI7PldgHM6dtyjg7mT6ge7c8wBip0vA--kPBwKFN4YyPPnzsvkPSBFOfHksaxkWsUeUL9zSpUpjETOYc0bKsYeT9mxoz5oB0uP_lJ40uZKPVVh6cLoK58dmWLNQmV1C3t6lc6sRBy3EJsLtC57Es0cm1DvUus8NJvLulOnrp-fH4l18opiHEChkn2M91-JG4W49qBsatn2sreWQ3YYNzXukG0luv0rsjyALPePeRttU0c3g5TXk4JM2Nqqw8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619645797,"updated":1619645797,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '943c7b52-4891-4e9f-b1f9-f30ba6963322',
  'x-ms-request-id',
  '4c8e0aa1-fc3e-4a96-adab-ac51b4b8f039',
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
  'Wed, 28 Apr 2021 21:36:36 GMT',
  'Content-Length',
  '716'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-PS512-/6926155f18fe4413ba4c7ad1988ae0d8')
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
  'westus2',
  'x-ms-client-request-id',
  'faeb80c5-380f-45ba-b571-4929a6b52b8b',
  'x-ms-request-id',
  'b765aace-b455-465e-9578-4197509671f5',
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
  'Wed, 28 Apr 2021 21:36:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/localCryptoKeyName-PS512-/6926155f18fe4413ba4c7ad1988ae0d8')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS512-/6926155f18fe4413ba4c7ad1988ae0d8","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mkih3bWfkeWQzjb4898XWjxQzm5HBU4CNBSJyPXn6dtub--RISylaWfEzxYivrH1c8gbAinMJFvTVNx5ca_rE53lvEI7PldgHM6dtyjg7mT6ge7c8wBip0vA--kPBwKFN4YyPPnzsvkPSBFOfHksaxkWsUeUL9zSpUpjETOYc0bKsYeT9mxoz5oB0uP_lJ40uZKPVVh6cLoK58dmWLNQmV1C3t6lc6sRBy3EJsLtC57Es0cm1DvUus8NJvLulOnrp-fH4l18opiHEChkn2M91-JG4W49qBsatn2sreWQ3YYNzXukG0luv0rsjyALPePeRttU0c3g5TXk4JM2Nqqw8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619645797,"updated":1619645797,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'faeb80c5-380f-45ba-b571-4929a6b52b8b',
  'x-ms-request-id',
  '582e3409-65fe-4ffa-8b72-e50b5a02f88d',
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
  'Wed, 28 Apr 2021 21:36:36 GMT',
  'Content-Length',
  '716'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-PS512-/6926155f18fe4413ba4c7ad1988ae0d8/sign', {"alg":"PS512","value":"N-pezlZMah39l8dyRzaKq0HwVUk7PQGpMkG1N-ogZB33pcAt09-5bL3a_NzW7QKNqZzNikQfEVgclTpgJafSAw"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS512-/6926155f18fe4413ba4c7ad1988ae0d8","value":"GeRSCJZueOugw6BDI9SfAsUc-IFfuhBzTH3sGFWBHcF0V18BaA45rLdgdFaO2Oeqd7u16QaqZJ1EWbHe0pKnnkRCgrMobDEz0x004oc4BdFrXBtEcWYtVN8wn0lvaN74xuZtDwF0K3Fo0x72q4_s2EJQ5ogOMXat9ux0p6_Fk-Iw6-QJKV7eMMvj8HZWH3awOWlV06tlMozYKgeOxUecT1sbS96c7vRFowLE9idoWCS6hfFtqCZdBP3W1TMQ3DPXfTVBoE6QLTmQhAJsU9uvYyCh1Qhv0XRduZD9xap6AvsmM50Xv1B-4Y3A--oZ4jwi3GCZWTNI1NLd2eKvmLqaaQ"}, [
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
  '6d355ad9-2d17-45bb-a555-95aa3385a6dc',
  'x-ms-request-id',
  '72273007-648c-4435-b4b9-f9ade4527f69',
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
  'Wed, 28 Apr 2021 21:36:37 GMT',
  'Content-Length',
  '477'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/localCryptoKeyName-PS512-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-PS512-","deletedDate":1619645798,"scheduledPurgeDate":1620250598,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS512-/6926155f18fe4413ba4c7ad1988ae0d8","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mkih3bWfkeWQzjb4898XWjxQzm5HBU4CNBSJyPXn6dtub--RISylaWfEzxYivrH1c8gbAinMJFvTVNx5ca_rE53lvEI7PldgHM6dtyjg7mT6ge7c8wBip0vA--kPBwKFN4YyPPnzsvkPSBFOfHksaxkWsUeUL9zSpUpjETOYc0bKsYeT9mxoz5oB0uP_lJ40uZKPVVh6cLoK58dmWLNQmV1C3t6lc6sRBy3EJsLtC57Es0cm1DvUus8NJvLulOnrp-fH4l18opiHEChkn2M91-JG4W49qBsatn2sreWQ3YYNzXukG0luv0rsjyALPePeRttU0c3g5TXk4JM2Nqqw8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619645797,"updated":1619645797,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'e5750a98-1580-4ca6-b868-2030c7212eb0',
  'x-ms-request-id',
  '54879495-53d0-4c11-a0af-436b94651d86',
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
  'Wed, 28 Apr 2021 21:36:38 GMT',
  'Content-Length',
  '877'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS512-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'ef3b4fae-edc9-4d2c-ba09-c2198c0543e9',
  'x-ms-request-id',
  'bce7c890-56ad-4c0c-8e3d-af9a0d22c3ce',
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
  'Wed, 28 Apr 2021 21:36:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS512-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '8f3c71e7-4e11-4cb8-95a6-a215fbb826d9',
  'x-ms-request-id',
  'a5fe6d5d-8d08-4a9f-9c4a-b231949548ee',
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
  'Wed, 28 Apr 2021 21:36:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS512-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '01b9b3b6-06c0-4311-8594-bb01164ffada',
  'x-ms-request-id',
  'd9e69259-0ef5-4e29-80c2-09a8bbf7095a',
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
  'Wed, 28 Apr 2021 21:36:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS512-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '52ddd50e-998c-48f1-817d-6d96e7f79090',
  'x-ms-request-id',
  '66dea5b7-cc8c-4b5c-812b-85718019ab01',
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
  'Wed, 28 Apr 2021 21:36:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS512-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '13de6e0c-92b4-4789-a1f1-547100149a4f',
  'x-ms-request-id',
  '7ec72977-a1e1-480d-b85b-515c1494b0dc',
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
  'Wed, 28 Apr 2021 21:36:43 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS512-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e4a4a41f-f75b-4154-a202-38fd2e77749a',
  'x-ms-request-id',
  '619b388a-0afb-4605-8629-2eafc3108686',
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
  'Wed, 28 Apr 2021 21:36:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS512-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '72e179ec-d171-4838-a7ad-027c526f53ec',
  'x-ms-request-id',
  '225d79da-c328-4226-ae93-947c058da755',
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
  'Wed, 28 Apr 2021 21:36:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS512-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'fc41fe44-317c-4dd7-9a2a-0646e713bf7e',
  'x-ms-request-id',
  'dcdd517c-1696-4f1b-8963-1e8c6cbc25a7',
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
  'Wed, 28 Apr 2021 21:36:50 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS512-')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: localCryptoKeyName-PS512-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '109',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3a2c7cc9-1f03-4fe8-98cc-aae7d4466c5c',
  'x-ms-request-id',
  'd5e4f85a-3c9b-4944-9c8d-9fcf018714b3',
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
  'Wed, 28 Apr 2021 21:36:52 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/localCryptoKeyName-PS512-')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/localCryptoKeyName-PS512-","deletedDate":1619645798,"scheduledPurgeDate":1620250598,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-PS512-/6926155f18fe4413ba4c7ad1988ae0d8","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"mkih3bWfkeWQzjb4898XWjxQzm5HBU4CNBSJyPXn6dtub--RISylaWfEzxYivrH1c8gbAinMJFvTVNx5ca_rE53lvEI7PldgHM6dtyjg7mT6ge7c8wBip0vA--kPBwKFN4YyPPnzsvkPSBFOfHksaxkWsUeUL9zSpUpjETOYc0bKsYeT9mxoz5oB0uP_lJ40uZKPVVh6cLoK58dmWLNQmV1C3t6lc6sRBy3EJsLtC57Es0cm1DvUus8NJvLulOnrp-fH4l18opiHEChkn2M91-JG4W49qBsatn2sreWQ3YYNzXukG0luv0rsjyALPePeRttU0c3g5TXk4JM2Nqqw8Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619645797,"updated":1619645797,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '449fc04c-f096-496f-b83b-bf305b8a110a',
  'x-ms-request-id',
  '4949956d-af65-435f-a883-daf11320fa22',
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
  'Wed, 28 Apr 2021 21:36:54 GMT',
  'Content-Length',
  '877'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/localCryptoKeyName-PS512-')
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
  'ef240767-fdea-4a9a-89bb-48f275d7ff0a',
  'x-ms-request-id',
  'c1e2c679-acf1-48b4-a3e9-fa5cf6517fec',
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
  'Wed, 28 Apr 2021 21:36:54 GMT'
]);

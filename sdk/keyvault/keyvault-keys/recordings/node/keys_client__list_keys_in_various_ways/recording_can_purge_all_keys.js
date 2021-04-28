let nock = require('nock');

module.exports.hash = "23cbf695fa30b5e2c280f2ed6850ab8f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
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
  '4a69c612-a057-4271-9909-28d5ea3e5f53',
  'x-ms-request-id',
  'd84cdab4-dfa3-4a96-9c66-194d4ccfe367',
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
  'Wed, 28 Apr 2021 20:49:57 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .get('/common/discovery/instance')
  .query(true)
  .reply(200, {"tenant_discovery_endpoint":"https://login.microsoftonline.com/azure_tenant_id/v2.0/.well-known/openid-configuration","api-version":"1.1","metadata":[{"preferred_network":"login.microsoftonline.com","preferred_cache":"login.windows.net","aliases":["login.microsoftonline.com","login.windows.net","login.microsoft.com","sts.windows.net"]},{"preferred_network":"login.partner.microsoftonline.cn","preferred_cache":"login.partner.microsoftonline.cn","aliases":["login.partner.microsoftonline.cn","login.chinacloudapi.cn"]},{"preferred_network":"login.microsoftonline.de","preferred_cache":"login.microsoftonline.de","aliases":["login.microsoftonline.de"]},{"preferred_network":"login.microsoftonline.us","preferred_cache":"login.microsoftonline.us","aliases":["login.microsoftonline.us","login.usgovcloudapi.net"]},{"preferred_network":"login-us.microsoftonline.com","preferred_cache":"login-us.microsoftonline.com","aliases":["login-us.microsoftonline.com"]}]}, [
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
  '31247fef-560b-4fe1-a558-abd44d467701',
  'x-ms-ests-server',
  '2.1.11654.16 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw0AAACTwBvYDgAAAA; expires=Fri, 28-May-2021 20:49:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7Wevr0uFitKnCwdj5CM3hR0l19LihTnooV39hYSgfeT3_LG0RSxZ6XaWLrzhJfNSBuiIPkrMBl0imTuandwnE1DaMUjKORu9-XC2qZLIDdOtjzIpGyfYMHHLNhTt8S6lP7o1clombWK1F_GVDP-yX8HGWg1NQ8hneQ9glTCWwMm-Lv0cgAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:49:57 GMT',
  'Content-Length',
  '980'
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
  '3ffbe755-4f58-4fad-8890-bfbd45b29700',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw0AAACTwBvYDgAAAA; expires=Fri, 28-May-2021 20:49:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'esctx=AQABAAAAAAD--DLA3VO7QrddgJg7WevrCgWTss1qGBVTcOvcVUAyL9Ek7lR5fS_zSZavorPAXVCmBmGUOIQl_OwTvyoOx97L_czddfj0gMFyMMK_R_4yN26r1agkpqa_FfcdZmB-XUqCnBpKqXbRpPImhlwbT1b7oO70CnbxalpxCCYVsePrVf7oqpVL3eeYbI1HXzhqQA4gAA; domain=.login.microsoftonline.com; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:49:57 GMT'
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
  'f2b4ca1c-7847-4d94-ac99-d459f6533a01',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'x-ms-clitelem',
  '1,0,0,,',
  'Set-Cookie',
  'fpc=AhaQWKq9CYtBrP8niBgsLC-nSoKIBwAAAF6_G9gOAAAA4BL6Uw0AAACTwBvYDgAAAA; expires=Fri, 28-May-2021 20:49:57 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 28 Apr 2021 20:49:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys')
  .query(true)
  .reply(200, {"value":[{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-supportstracing-31376871860090416","attributes":{"enabled":true,"created":1619642737,"updated":1619642737,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test24720158450246266","attributes":{"enabled":true,"created":1619642822,"updated":1619642822,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test32622644288858327","attributes":{"enabled":true,"created":1619642867,"updated":1619642867,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3451107887784819","attributes":{"enabled":true,"created":1619642823,"updated":1619642823,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test9485625545816023","attributes":{"enabled":true,"created":1619642867,"updated":1619642867,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"kid":"https://keyvault_name.vault.azure.net/keys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716","attributes":{"enabled":true,"created":1619642786,"updated":1619642786,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}},{"kid":"https://keyvault_name.vault.azure.net/keys/importKeyName-canimportakey-03934567658158583","attributes":{"enabled":true,"created":1619642997,"updated":1619642997,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}],"nextLink":null}, [
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
  '4a69c612-a057-4271-9909-28d5ea3e5f53',
  'x-ms-request-id',
  'cdb04326-fbb9-467c-855d-7dae789e7339',
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
  'Wed, 28 Apr 2021 20:49:57 GMT',
  'Content-Length',
  '1720'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/CRUDKeyName-supportstracing-31376871860090416')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-supportstracing-31376871860090416","deletedDate":1619642998,"scheduledPurgeDate":1620247798,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-supportstracing-31376871860090416/5de97976122a46c0aeaba450cee4233e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"9PVANg6YSGzBL4DI1PWCywbqd-P-TWX-39IR6zq8M9I4DofJgt-ZC0JEOXyMaRtXfopueGmwyVhAj2l0Jq_z6x9ZYoqZbTJX9h3mFxZ2Tq2FFQtbGpvaIX-V3Ada57Ix276uC7I3uPXGIkOS5CDLMdPTYY2ZGOOrB4STG2nT5GZoDVyJeVoSKnN9wZEwhstL7I3TgnX4ZN9F66gjZP7gF1YN-xY9H7wWJi-NP6HXHmspvwzacpOp7GpLbRUfZUmzWjGQ2stH3s-OEh4-97G_mV8dEsAspxT1lYL-FyLfih3E1WsS5m3Z2WK1ysIUl9l0kF21sDygf7JfMJuI9T5sVQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642737,"updated":1619642737,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'd024b367-78b6-4688-a2ca-bd4b079e1984',
  'x-ms-request-id',
  'db7d01f4-a59b-4937-a5c2-451df9f0dc3e',
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
  'Wed, 28 Apr 2021 20:49:58 GMT',
  'Content-Length',
  '885'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-supportstracing-31376871860090416')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-supportstracing-31376871860090416"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'b731451d-72c7-44e7-9a27-fb289f3c5b78',
  'x-ms-request-id',
  '6a4d7d36-afee-42a2-b3d5-d94135479da6',
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
  'Wed, 28 Apr 2021 20:49:57 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-supportstracing-31376871860090416')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-supportstracing-31376871860090416"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '79dfcd8a-f903-49e4-966a-a0b9272af7e7',
  'x-ms-request-id',
  '9d835c13-64fa-4b43-a753-86c5da46fe12',
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
  'Wed, 28 Apr 2021 20:49:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-supportstracing-31376871860090416')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-supportstracing-31376871860090416"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e61088d4-66bc-4648-8d49-80b3fdd1b7df',
  'x-ms-request-id',
  '00c3a5b7-1d82-4d74-985b-05c73540b5cb',
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
  'Wed, 28 Apr 2021 20:50:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-supportstracing-31376871860090416')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-supportstracing-31376871860090416"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '1a53a493-a9d7-4402-8feb-f2868bac2e1d',
  'x-ms-request-id',
  'd3ba0ea9-4fe6-44a2-bd89-95ff1b0a41b9',
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
  'Wed, 28 Apr 2021 20:50:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-supportstracing-31376871860090416')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-supportstracing-31376871860090416"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'f9fa751a-cf1a-46da-aa1c-6c6633b24437',
  'x-ms-request-id',
  '42309317-c679-46db-b6e9-fdaf2f6a3fd5',
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
  'Wed, 28 Apr 2021 20:50:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-supportstracing-31376871860090416')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-supportstracing-31376871860090416"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'fc74a25a-8283-4672-9d99-821246955b65',
  'x-ms-request-id',
  '8291bf9d-c433-41ad-8a94-655015eb5eb3',
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
  'Wed, 28 Apr 2021 20:50:06 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-supportstracing-31376871860090416')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-supportstracing-31376871860090416"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '3dbfd74c-1b22-4e04-8f64-8a308c8ae2ad',
  'x-ms-request-id',
  'ef6ad742-71ad-447a-83a2-7d81c6492c77',
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
  'Wed, 28 Apr 2021 20:50:08 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-supportstracing-31376871860090416')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-supportstracing-31376871860090416"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c8d3f9a9-f8ac-4f8e-b20c-540bbc101700',
  'x-ms-request-id',
  'd78c5e73-65a0-4908-b133-bc696efbca68',
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
  'Wed, 28 Apr 2021 20:50:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-supportstracing-31376871860090416')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: CRUDKeyName-supportstracing-31376871860090416"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '5633e3bd-35e9-4c91-a7bd-4e5344aed757',
  'x-ms-request-id',
  '64805d5b-d8a8-4b46-b1b2-d42e38cac9ff',
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
  'Wed, 28 Apr 2021 20:50:13 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-supportstracing-31376871860090416')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-supportstracing-31376871860090416","deletedDate":1619642998,"scheduledPurgeDate":1620247798,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-supportstracing-31376871860090416/5de97976122a46c0aeaba450cee4233e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"9PVANg6YSGzBL4DI1PWCywbqd-P-TWX-39IR6zq8M9I4DofJgt-ZC0JEOXyMaRtXfopueGmwyVhAj2l0Jq_z6x9ZYoqZbTJX9h3mFxZ2Tq2FFQtbGpvaIX-V3Ada57Ix276uC7I3uPXGIkOS5CDLMdPTYY2ZGOOrB4STG2nT5GZoDVyJeVoSKnN9wZEwhstL7I3TgnX4ZN9F66gjZP7gF1YN-xY9H7wWJi-NP6HXHmspvwzacpOp7GpLbRUfZUmzWjGQ2stH3s-OEh4-97G_mV8dEsAspxT1lYL-FyLfih3E1WsS5m3Z2WK1ysIUl9l0kF21sDygf7JfMJuI9T5sVQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642737,"updated":1619642737,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '023fa470-8a63-4af3-aa9a-4fa2b9805061',
  'x-ms-request-id',
  '556ea2d4-2784-4fff-b713-b5cc68c4b7ca',
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
  'Wed, 28 Apr 2021 20:50:14 GMT',
  'Content-Length',
  '885'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/CRUDKeyName-supportstracing-31376871860090416')
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
  '2ca9d13e-e88c-4ace-8d5f-a179fffcbc5d',
  'x-ms-request-id',
  '5e1ea46d-a20c-461b-9cf4-4a92d7f2b40b',
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
  'Wed, 28 Apr 2021 20:50:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test24720158450246266')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test24720158450246266","deletedDate":1619643015,"scheduledPurgeDate":1620247815,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test24720158450246266/4ce72b33bdc74206aa5ba312914f46de","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"w_tMPUJRk6QdH_cD_0RX1s4zN2dve8RzgGbemEHhpv5GJbJbxHtismrzEoaGACmWRw6nnqgniCFpehSVDzi6WBawbPXzdt-1IZTcIg-afd6Kt7HcVAcT5tTKGz0GpJspAg8QFBRQK-0oBncXFX0CyjY5TViFXrpH9zq4-g7w3AvivZGwGNwM6T8GDSBfQ60-05ZD3tFXmPOi_GgM1mxQ36HGahslRn6Hz6wSfkt36R317jG9VxPUNpmYCToBKtr4k6AYCCTmXJtQpK6qCzYeN5KRpROESVIbVPaTEoTxyq2nBqivJcQKH3oX06mLSm8NX8xJ2ZZyuK1aRsoLgxBI5Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619642822,"updated":1619642822,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '0c225e86-eda6-47e9-9425-5096a88678d5',
  'x-ms-request-id',
  '2c812701-f04a-4373-b5d4-b129aa546120',
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
  'Wed, 28 Apr 2021 20:50:15 GMT',
  'Content-Length',
  '877'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test24720158450246266')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test24720158450246266"}}, [
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
  'a36025b8-6027-4dc6-a9e5-9a7e55698d51',
  'x-ms-request-id',
  '8017551c-794f-44c0-9f71-45d4df66fcd8',
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
  'Wed, 28 Apr 2021 20:50:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test24720158450246266')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test24720158450246266"}}, [
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
  'a5c75594-d09c-43f3-a611-01d36becc6b0',
  'x-ms-request-id',
  '9df2eb79-7dba-45b5-94b5-52f9d2c98b70',
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
  'Wed, 28 Apr 2021 20:50:15 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test24720158450246266')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test24720158450246266"}}, [
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
  '64930185-c239-486c-8b45-7277822c089a',
  'x-ms-request-id',
  '67bca643-f78d-4e17-a0ef-7626063b346d',
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
  'Wed, 28 Apr 2021 20:50:18 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test24720158450246266')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test24720158450246266"}}, [
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
  '9103cd18-4ba9-4a75-bcb4-4154e0ad67b9',
  'x-ms-request-id',
  '8b47aabf-627a-4411-b92c-90de5e53d57d',
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
  'Wed, 28 Apr 2021 20:50:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test24720158450246266')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test24720158450246266"}}, [
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
  '65eb3b8e-d6cf-4814-9a77-adf728132875',
  'x-ms-request-id',
  'ca23cae2-63cf-4db6-981d-2d6ff3bbde33',
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
  'Wed, 28 Apr 2021 20:50:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test24720158450246266')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test24720158450246266"}}, [
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
  '083e9b86-911c-4b6a-8774-69325838978c',
  'x-ms-request-id',
  'c1ff1f15-e319-42a2-b67b-4b7dbb25e968',
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
  'Wed, 28 Apr 2021 20:50:23 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test24720158450246266')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test24720158450246266","deletedDate":1619643015,"scheduledPurgeDate":1620247815,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test24720158450246266/4ce72b33bdc74206aa5ba312914f46de","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"w_tMPUJRk6QdH_cD_0RX1s4zN2dve8RzgGbemEHhpv5GJbJbxHtismrzEoaGACmWRw6nnqgniCFpehSVDzi6WBawbPXzdt-1IZTcIg-afd6Kt7HcVAcT5tTKGz0GpJspAg8QFBRQK-0oBncXFX0CyjY5TViFXrpH9zq4-g7w3AvivZGwGNwM6T8GDSBfQ60-05ZD3tFXmPOi_GgM1mxQ36HGahslRn6Hz6wSfkt36R317jG9VxPUNpmYCToBKtr4k6AYCCTmXJtQpK6qCzYeN5KRpROESVIbVPaTEoTxyq2nBqivJcQKH3oX06mLSm8NX8xJ2ZZyuK1aRsoLgxBI5Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619642822,"updated":1619642822,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'f9848225-987d-4fa2-9a5a-ca67b1807877',
  'x-ms-request-id',
  'f3810bbd-6f7c-4630-8daf-041c7ba46273',
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
  'Wed, 28 Apr 2021 20:50:26 GMT',
  'Content-Length',
  '877'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test24720158450246266')
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
  '6f93688c-7432-403f-8bc2-fe9600cca46f',
  'x-ms-request-id',
  '3aa55547-80c7-48cc-b315-d1142b11fa94',
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
  'Wed, 28 Apr 2021 20:50:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test32622644288858327')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test32622644288858327","deletedDate":1619643027,"scheduledPurgeDate":1620247827,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test32622644288858327/0d25672c1592454287ad77211d9f5848","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tG47KjD9aIhC8GGmX-kVHucWy3UYwBvkkbLCD54a7MgQOt8e9kKRw7JeMXOPz47R6MO8Ob1Z3OySpfXI8cvfbKKiezDvJQI1GQcoXbvJ1AwreUtXZexaIPk4Nj0zb1URWlju_2uMvPVzI1dljQNZ7CM60b6I7tQM-f2tLmIaSOrTXm1DHBrUtxCbKZPJtZtSXL9pwfZehXARP49TYatbXgwz9rqWP9I2ZerdatiHmY3W2stg0SpTkq2Mk4-LCdz2UtWW12JzJlAm-nq3kbbH9PftXlv8iEGbKvd9cLXG1-VeK4aLqKWxY4pFsw0haddsYw3gCnK9acavFnMV49IVGQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642867,"updated":1619642867,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '33ab5b15-27f8-44e5-b5ba-97fa152516d5',
  'x-ms-request-id',
  'ef78739b-c017-419a-a72d-1c0a1db64aec',
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
  'Wed, 28 Apr 2021 20:50:26 GMT',
  'Content-Length',
  '877'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test32622644288858327')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test32622644288858327"}}, [
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
  'eb3ce3da-0149-4f07-b693-74404294d481',
  'x-ms-request-id',
  'd3053bd8-2507-45d1-9a66-87e51c634cad',
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
  'Wed, 28 Apr 2021 20:50:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test32622644288858327')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test32622644288858327"}}, [
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
  '5cd90467-334e-434a-9504-afb2b3ac976b',
  'x-ms-request-id',
  '63206cc3-d3ac-402b-98f3-c4132d2a2d23',
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
  'Wed, 28 Apr 2021 20:50:26 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test32622644288858327')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test32622644288858327"}}, [
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
  '4be721e7-ba81-4dbb-bb0a-d48abc37ad33',
  'x-ms-request-id',
  '4961efd9-0261-43c8-b761-df67099fd4cb',
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
  'Wed, 28 Apr 2021 20:50:28 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test32622644288858327')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test32622644288858327"}}, [
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
  '98b23658-f241-44e8-9072-5c885723a965',
  'x-ms-request-id',
  '4fa06428-0e25-4796-b766-b5c0160f4c69',
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
  'Wed, 28 Apr 2021 20:50:31 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test32622644288858327')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test32622644288858327"}}, [
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
  '865b254b-a97a-43b3-9113-be915f4a5431',
  'x-ms-request-id',
  '4e01100a-82ee-42ba-9453-154a28c8dcdb',
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
  'Wed, 28 Apr 2021 20:50:33 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test32622644288858327')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test32622644288858327","deletedDate":1619643027,"scheduledPurgeDate":1620247827,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test32622644288858327/0d25672c1592454287ad77211d9f5848","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"tG47KjD9aIhC8GGmX-kVHucWy3UYwBvkkbLCD54a7MgQOt8e9kKRw7JeMXOPz47R6MO8Ob1Z3OySpfXI8cvfbKKiezDvJQI1GQcoXbvJ1AwreUtXZexaIPk4Nj0zb1URWlju_2uMvPVzI1dljQNZ7CM60b6I7tQM-f2tLmIaSOrTXm1DHBrUtxCbKZPJtZtSXL9pwfZehXARP49TYatbXgwz9rqWP9I2ZerdatiHmY3W2stg0SpTkq2Mk4-LCdz2UtWW12JzJlAm-nq3kbbH9PftXlv8iEGbKvd9cLXG1-VeK4aLqKWxY4pFsw0haddsYw3gCnK9acavFnMV49IVGQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642867,"updated":1619642867,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '0b1627b4-310b-4484-b69d-d7e5d9c9d6f6',
  'x-ms-request-id',
  '865c4e2c-c8f1-4f63-a427-39c03ff39b74',
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
  'Wed, 28 Apr 2021 20:50:35 GMT',
  'Content-Length',
  '877'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test32622644288858327')
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
  '81a09b8f-689e-40d5-9b04-fe7b52723589',
  'x-ms-request-id',
  '879980c8-b69a-47dc-842d-3bf47e657db8',
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
  'Wed, 28 Apr 2021 20:50:35 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test3451107887784819')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test3451107887784819","deletedDate":1619643036,"scheduledPurgeDate":1620247836,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3451107887784819/df4b7fa969c1430f81bb77d38e30905e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rjDV1nAQhlZT8P1M5cggVL7QWhMUInKpEsIl5U_F6E_6L10KMJlUVIpp9oaRIL7YNwsm0im0G-xe01PPzlFCIvMj64z9kmhxNVV6HR43B1AvZuP3UiV3wWyNonfBH4eq2vKVPpI2DijUelPHVU8Z_QRO50M9m0hueBKWFhrDpQ08lx4mSHsJDYGeQBGTYlyGWI3wAJlHCG9_wriXndX-TuV7qNDwv-ILSprMom1y5oUqgovvQvGP-DmQ27MfKDjcoJ8Ct2zWE-QjSrOGZA8knpTV5-58_68EwZWpsrqCImrIcxGqkeXm2kY8eWND7WZycULbMgHxp7toeSCR2G49sQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642823,"updated":1619642823,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'ed4ee53c-62d8-40ed-9d4c-2f0f7ca78946',
  'x-ms-request-id',
  'f0eea6db-a1a4-4957-991a-4e1088e76ae2',
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
  'Wed, 28 Apr 2021 20:50:35 GMT',
  'Content-Length',
  '875'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3451107887784819')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3451107887784819"}}, [
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
  'c1adf33f-17e7-43c2-91f7-e57bc663fc97',
  'x-ms-request-id',
  '8a0227fb-8653-479d-9f51-182dd5441f35',
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
  'Wed, 28 Apr 2021 20:50:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3451107887784819')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3451107887784819"}}, [
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
  '36a6b30a-0ccf-44d7-ae34-80ccc55d6377',
  'x-ms-request-id',
  'e07dad43-7828-4b37-8fcb-23e2e2af2c39',
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
  'Wed, 28 Apr 2021 20:50:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3451107887784819')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3451107887784819"}}, [
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
  '0dc2a430-9e87-407f-8e5a-4af03fe1a6c6',
  'x-ms-request-id',
  '8ad914b2-5df5-40ba-8b76-1edbfd63fd70',
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
  'Wed, 28 Apr 2021 20:50:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3451107887784819')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3451107887784819"}}, [
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
  'a1f4ffb3-3337-4e18-8277-a59fa68238e5',
  'x-ms-request-id',
  '230f447d-7d60-45cf-8043-3466d3dac183',
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
  'Wed, 28 Apr 2021 20:50:40 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3451107887784819')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3451107887784819"}}, [
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
  '57e5f5d2-8915-44cc-a643-04e2fe1af78d',
  'x-ms-request-id',
  '3554be53-400d-4f25-a860-089eb04bc892',
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
  'Wed, 28 Apr 2021 20:50:42 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3451107887784819')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3451107887784819"}}, [
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
  '6b64c18e-d551-474b-9bea-e90ab8f88c0f',
  'x-ms-request-id',
  '1cf789fb-2b01-4cd5-9e2b-1d012dbbad56',
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
  'Wed, 28 Apr 2021 20:50:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3451107887784819')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test3451107887784819"}}, [
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
  '2ebb5047-351d-44ac-bc6a-b9f94ebf5ba9',
  'x-ms-request-id',
  '2a82f4a5-5edf-4743-8217-c14d11507291',
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
  'Wed, 28 Apr 2021 20:50:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test3451107887784819')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test3451107887784819","deletedDate":1619643036,"scheduledPurgeDate":1620247836,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test3451107887784819/df4b7fa969c1430f81bb77d38e30905e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rjDV1nAQhlZT8P1M5cggVL7QWhMUInKpEsIl5U_F6E_6L10KMJlUVIpp9oaRIL7YNwsm0im0G-xe01PPzlFCIvMj64z9kmhxNVV6HR43B1AvZuP3UiV3wWyNonfBH4eq2vKVPpI2DijUelPHVU8Z_QRO50M9m0hueBKWFhrDpQ08lx4mSHsJDYGeQBGTYlyGWI3wAJlHCG9_wriXndX-TuV7qNDwv-ILSprMom1y5oUqgovvQvGP-DmQ27MfKDjcoJ8Ct2zWE-QjSrOGZA8knpTV5-58_68EwZWpsrqCImrIcxGqkeXm2kY8eWND7WZycULbMgHxp7toeSCR2G49sQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642823,"updated":1619642823,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '990f8143-2f63-4014-8933-76c98851c67e',
  'x-ms-request-id',
  '16b06a5a-f5ac-4600-8d26-6a8c30acebff',
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
  'Wed, 28 Apr 2021 20:50:48 GMT',
  'Content-Length',
  '875'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test3451107887784819')
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
  '806b8d6d-21be-45f3-8101-58b72a357cf7',
  'x-ms-request-id',
  '8583fb8f-23f3-4641-9727-34a710fb586d',
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
  'Wed, 28 Apr 2021 20:50:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test9485625545816023')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test9485625545816023","deletedDate":1619643049,"scheduledPurgeDate":1620247849,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test9485625545816023/c2cdc849b56542b487b444d349edecb5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"yjdEutet-1CX_i5JjI8rS7eiO5B0SvkwuTYtuLdhkBufg3HlAHEHTqj-Yx7UmCfxJyY3i17la09fMOR0-qo054F_PNnjwbh9bsIoMDViXozEpGcvGriaqag6uz_DFIcI2tllgp4aUEkV5CXh3ttgOxNUpap8LyCPc0nQ_vg-xnlzoA9smZA59kvYX5k_ICe0GPdHsjURHTb2ob46cX3Cuu8cmPKmQMfNPYaareK0K_fFrtzpTfC0adVO-ov22KTeDpUCJBkGq_KfvQJkO61iaBo9VlOxKc3bQsnmck9YBMtX03dctO6SD5wlm0omaDz22p5nsny5l0rNC9sD6WSZ-Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619642867,"updated":1619642867,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '06ee3765-f2ac-4370-8971-0d6d971ee2bb',
  'x-ms-request-id',
  '357f7596-3a24-45df-8930-24a0ec940c18',
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
  'Wed, 28 Apr 2021 20:50:49 GMT',
  'Content-Length',
  '875'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test9485625545816023')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test9485625545816023"}}, [
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
  '33e7119b-4938-40fc-b7f7-086ae6139f49',
  'x-ms-request-id',
  '67744b7f-0e2a-4b49-9cb8-24812e67dbc0',
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
  'Wed, 28 Apr 2021 20:50:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test9485625545816023')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test9485625545816023"}}, [
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
  '37e67719-45ad-4ea7-abf9-73168aa8c669',
  'x-ms-request-id',
  '4b885187-bfa2-429f-8316-fc4abeb2d669',
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
  'Wed, 28 Apr 2021 20:50:49 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test9485625545816023')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test9485625545816023"}}, [
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
  '8477b012-aaea-4332-b441-eafed45a620a',
  'x-ms-request-id',
  '962f1cc9-abf4-4a96-969d-15f263486bd8',
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
  'Wed, 28 Apr 2021 20:50:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test9485625545816023')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test9485625545816023"}}, [
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
  'a823bd6b-1b53-48ec-b89b-c39ec22720e1',
  'x-ms-request-id',
  'aa28d431-5600-4a4d-9d29-58a07f7b24b9',
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
  'Wed, 28 Apr 2021 20:50:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test9485625545816023')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test9485625545816023"}}, [
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
  'e1b7f8b1-d26e-4469-a9e6-3789f7e1d777',
  'x-ms-request-id',
  '69ca4e64-0e51-47f9-af80-34e6c470dcad',
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
  'Wed, 28 Apr 2021 20:50:56 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test9485625545816023')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test9485625545816023","deletedDate":1619643049,"scheduledPurgeDate":1620247849,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test9485625545816023/c2cdc849b56542b487b444d349edecb5","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"yjdEutet-1CX_i5JjI8rS7eiO5B0SvkwuTYtuLdhkBufg3HlAHEHTqj-Yx7UmCfxJyY3i17la09fMOR0-qo054F_PNnjwbh9bsIoMDViXozEpGcvGriaqag6uz_DFIcI2tllgp4aUEkV5CXh3ttgOxNUpap8LyCPc0nQ_vg-xnlzoA9smZA59kvYX5k_ICe0GPdHsjURHTb2ob46cX3Cuu8cmPKmQMfNPYaareK0K_fFrtzpTfC0adVO-ov22KTeDpUCJBkGq_KfvQJkO61iaBo9VlOxKc3bQsnmck9YBMtX03dctO6SD5wlm0omaDz22p5nsny5l0rNC9sD6WSZ-Q","e":"AQAB"},"attributes":{"enabled":true,"created":1619642867,"updated":1619642867,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '4415e337-ebcd-424b-8268-83494b5a28c0',
  'x-ms-request-id',
  'b2e06055-f89e-4446-a5cd-1c6dcc356da5',
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
  'Wed, 28 Apr 2021 20:50:58 GMT',
  'Content-Length',
  '875'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test9485625545816023')
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
  'ef6ad816-c3f2-4043-930a-a49781252a7a',
  'x-ms-request-id',
  'ba123234-7d34-427b-aee9-f9aa240062a6',
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
  'Wed, 28 Apr 2021 20:50:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716","deletedDate":1619643059,"scheduledPurgeDate":1620247859,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716/c68eff152f824c20a56728bf011e227f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0MqseUI2rGFey3O4O_Cev7slpS1QbgqWV9N-3JX-vg74aLjQ6iSD9lgB1L6jCTcw5ufYxsZFhnWYjcttkMirUrdnI6m2KL8Z0m2x_KLBC9OZTmQ4zQ4H98GrxAKg6NRWKzfx5-yyvoo3WearB3wB_B-oNTC-Hl1qNPgsAzwCRPOt_AKbWYeee3LV9CXo_XlEXn9gvrl8y7_eL5R-Vxoe1wUravBHUnqPEn3EMrhaSBXfbr8p67D9AT6t_mzP16spkw4nlbQ8ZbWeYb9p8351d30GiTxfwp2Xwvh9EqW-yszS_GzOBwBhu_oqXIc9dug_jzkOKNJ_VtEwL9zgrK4fTQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642786,"updated":1619642786,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '0916577a-83c2-460b-b148-fd93cce9f143',
  'x-ms-request-id',
  'adf6c3cb-4807-4c9d-ab91-1f76ca2f0fc7',
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
  'Wed, 28 Apr 2021 20:50:58 GMT',
  'Content-Length',
  '975'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '158',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '49471b10-5c61-4925-a8d4-3d88d9f1b42a',
  'x-ms-request-id',
  'b56cb618-6e42-4772-9362-592fd4912ab2',
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
  'Wed, 28 Apr 2021 20:50:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '158',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '90d1f4b9-5f58-4d0e-9c6d-da508a306080',
  'x-ms-request-id',
  '1a0e1b79-7e11-453d-acc1-990f729803f8',
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
  'Wed, 28 Apr 2021 20:50:58 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '158',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'c9a347ed-1866-4757-b75d-a1a7b647401f',
  'x-ms-request-id',
  '1f8d2334-8b4d-46c8-bc4c-6f3f8324df1e',
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
  'Wed, 28 Apr 2021 20:51:00 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '158',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '897fd599-fe43-4218-b92a-5008995ab566',
  'x-ms-request-id',
  'b5f8d9ee-da40-4fd4-a54a-863996f20a83',
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
  'Wed, 28 Apr 2021 20:51:02 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '158',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e76b2f09-3b82-4918-8dd7-7a8d23b4c1ed',
  'x-ms-request-id',
  '5e721833-45ad-421f-9c74-e813b7e085ad',
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
  'Wed, 28 Apr 2021 20:51:04 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '158',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd02b4e42-9299-49a5-8bdc-2cf1d38a47a8',
  'x-ms-request-id',
  'e555211f-40d1-4946-8b67-87ff1590f09a',
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
  'Wed, 28 Apr 2021 20:51:07 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716","deletedDate":1619643059,"scheduledPurgeDate":1620247859,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716/c68eff152f824c20a56728bf011e227f","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0MqseUI2rGFey3O4O_Cev7slpS1QbgqWV9N-3JX-vg74aLjQ6iSD9lgB1L6jCTcw5ufYxsZFhnWYjcttkMirUrdnI6m2KL8Z0m2x_KLBC9OZTmQ4zQ4H98GrxAKg6NRWKzfx5-yyvoo3WearB3wB_B-oNTC-Hl1qNPgsAzwCRPOt_AKbWYeee3LV9CXo_XlEXn9gvrl8y7_eL5R-Vxoe1wUravBHUnqPEn3EMrhaSBXfbr8p67D9AT6t_mzP16spkw4nlbQ8ZbWeYb9p8351d30GiTxfwp2Xwvh9EqW-yszS_GzOBwBhu_oqXIc9dug_jzkOKNJ_VtEwL9zgrK4fTQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619642786,"updated":1619642786,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '7194c2aa-0ab8-47a4-9994-251880f061d0',
  'x-ms-request-id',
  '9a41754f-9076-42a5-801c-f6f701004830',
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
  'Wed, 28 Apr 2021 20:51:09 GMT',
  'Content-Length',
  '975'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptoKeyName-theCryptographyClientcanbecreatedfromafullKeyVaultKeyobject-8742909542703716')
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
  '75640b9a-5926-4923-b12b-59f965dab1dd',
  'x-ms-request-id',
  'fe44ab55-528f-47d2-a011-0a90faa184b6',
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
  'Wed, 28 Apr 2021 20:51:09 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/importKeyName-canimportakey-03934567658158583')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/importKeyName-canimportakey-03934567658158583","deletedDate":1619643070,"scheduledPurgeDate":1620247870,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/importKeyName-canimportakey-03934567658158583/478f41e4b51d4468b333fe97e5b53247","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"AKCRTQAjSsaDshtMFdW-2Ie9yVnC5Xr1Suc06PAHINd10nXkVSB-N4TO62ClCkZV3XKnqU0nHo7o95WaZpym53W_DiO62umRtFKdl4UotL2QUh0y3SZWeWuoK2u_x2aMj17rUFN0f9GZMZ0pqEQNCPRBLVJ_-TEe2nGCWSC0exxGsRqz6R1zFkB-icfzQPe4WjQELOUXQ7J9RxhAPTTHtDivYYG-BeTRHrmF04JT1_6b9T_C8bAC0i0teT-nmlBLarQtBJKATXBx1yegbPOoiTqlQrFQP4MrKWNxtnB9Tcbjcvj-Z9je0ckI_eRc4DvAhqcUh_p15Dqg4GeaoNIO_jU","e":"AQAB"},"attributes":{"enabled":true,"created":1619642997,"updated":1619642997,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '52acfff0-9d25-4cef-bef0-b1e707325726',
  'x-ms-request-id',
  '214dcfcd-af85-462e-a910-c9288ac02338',
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
  'Wed, 28 Apr 2021 20:51:10 GMT',
  'Content-Length',
  '886'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/importKeyName-canimportakey-03934567658158583')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: importKeyName-canimportakey-03934567658158583"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '77098da4-2404-45a1-bfea-d1ad9a84eb62',
  'x-ms-request-id',
  '31d914ee-129a-45e2-9465-6b90a23eca4f',
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
  'Wed, 28 Apr 2021 20:51:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/importKeyName-canimportakey-03934567658158583')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: importKeyName-canimportakey-03934567658158583"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'd2ed42a2-bb4a-43d6-bbe9-8fc9f9323c33',
  'x-ms-request-id',
  '42f7997a-c975-4876-81d9-b5f185c76ea7',
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
  'Wed, 28 Apr 2021 20:51:10 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/importKeyName-canimportakey-03934567658158583')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: importKeyName-canimportakey-03934567658158583"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'e4d9471d-6c5b-4726-a638-9746988743f1',
  'x-ms-request-id',
  'bb7fdae6-1054-4fc9-91a0-02750caaa2b6',
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
  'Wed, 28 Apr 2021 20:51:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/importKeyName-canimportakey-03934567658158583')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: importKeyName-canimportakey-03934567658158583"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '7728e968-146d-4022-82c9-dd5924b6980c',
  'x-ms-request-id',
  '48055270-97e5-4da6-98fd-fe4563fb1bfe',
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
  'Wed, 28 Apr 2021 20:51:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/importKeyName-canimportakey-03934567658158583')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: importKeyName-canimportakey-03934567658158583"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  '7fd91810-d5f1-4007-99b5-c01bc501a7e2',
  'x-ms-request-id',
  '4016e6f2-3c38-4f0d-9c6c-05d348ac931c',
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
  'Wed, 28 Apr 2021 20:51:16 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/importKeyName-canimportakey-03934567658158583')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: importKeyName-canimportakey-03934567658158583"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '113',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-client-request-id',
  'febbf838-c8bd-4214-9e89-26af9e33a41f',
  'x-ms-request-id',
  '71e29650-bbb7-4fef-983d-07bdff1620ad',
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
  'Wed, 28 Apr 2021 20:51:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/importKeyName-canimportakey-03934567658158583')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/importKeyName-canimportakey-03934567658158583","deletedDate":1619643070,"scheduledPurgeDate":1620247870,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/importKeyName-canimportakey-03934567658158583/478f41e4b51d4468b333fe97e5b53247","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"AKCRTQAjSsaDshtMFdW-2Ie9yVnC5Xr1Suc06PAHINd10nXkVSB-N4TO62ClCkZV3XKnqU0nHo7o95WaZpym53W_DiO62umRtFKdl4UotL2QUh0y3SZWeWuoK2u_x2aMj17rUFN0f9GZMZ0pqEQNCPRBLVJ_-TEe2nGCWSC0exxGsRqz6R1zFkB-icfzQPe4WjQELOUXQ7J9RxhAPTTHtDivYYG-BeTRHrmF04JT1_6b9T_C8bAC0i0teT-nmlBLarQtBJKATXBx1yegbPOoiTqlQrFQP4MrKWNxtnB9Tcbjcvj-Z9je0ckI_eRc4DvAhqcUh_p15Dqg4GeaoNIO_jU","e":"AQAB"},"attributes":{"enabled":true,"created":1619642997,"updated":1619642997,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '408dafd6-8f21-439c-b17f-33e6f69be01e',
  'x-ms-request-id',
  'd6b31677-ba5a-4859-bc4e-64e3e48533ff',
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
  'Wed, 28 Apr 2021 20:51:20 GMT',
  'Content-Length',
  '886'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/importKeyName-canimportakey-03934567658158583')
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
  '5b501d67-9deb-40f4-8233-30af47edb947',
  'x-ms-request-id',
  '76a94357-e3cd-4d4a-bdad-04cc4ab062ac',
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
  'Wed, 28 Apr 2021 20:51:21 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys')
  .query(true)
  .reply(200, {"value":[],"nextLink":null}, [
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
  '60333deb-55c7-4e7d-a328-35e76b393679',
  'x-ms-request-id',
  '18dca84c-d9a0-4bf7-bf3f-8eda6d10a44c',
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
  'Wed, 28 Apr 2021 20:51:20 GMT',
  'Content-Length',
  '28'
]);

let nock = require('nock');

module.exports.hash = "2d5413d5c2ee360bf55b062d81f64260";

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
  'x-ms-request-id',
  'b4d3f23a-7cf2-4244-8fd3-19a0e841cc54',
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
  'Tue, 16 Feb 2021 18:14:45 GMT'
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
  '429d5dae-a8c4-48c3-93a3-20996b364500',
  'x-ms-ests-server',
  '2.1.11496.5 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AlYh5w5_onJDnZLEqg70g4sA4qsDEAAAAIACvtcOAAAA; expires=Thu, 18-Mar-2021 18:14:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:14:45 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/b736244fba8f4e00bfb02ada9546c1b2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"3p3tTxDNSbN3k28P6QtI87qLmyMe7ywmyExdDHgVIHg8dK_qJDkvUbBK-e9_KCaNj5lBvF29tFGCt94nEtU6Sh5dCBE-7F517jukVTRjvjXBSqJvt49wZpIhlG1EDkiVkpOtGUu6aAAeMo1YuP2xg7ktsIUpX5SgnWmM1ztqvDdauT9C5Jkjz4_RAp5eucKtaBZavpnEab3y9H-JcLU3GAKsIWDKJDpYaQcBpMXLSklt6jhFOFCOLZC5eA5t3SDj2GrB65iNrx-Uj9JmX9W8e05oTQvuCh9Vy8uJoszBiSQ1j6bSeZp2Qhbntt9cTFzjedoO1wdKQ7uU5U37IKlPFQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613499285,"updated":1613499285,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'e1c3bb54-d698-4f4f-9ff2-fba24dc33e8d',
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
  'Tue, 16 Feb 2021 18:14:45 GMT',
  'Content-Length',
  '714'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/create', {"kty":"RSA-HSM"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/46c991f8f05c4e05b500994143142009","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qRFJ3T7WSY3G33SkQKKeHRGmqsCkrmSa244LihJNPr2KSda0FBBiGtmcckKba2aGE6x7QEkDZh0-IFDmfTnm8_S_pHni0yamr0pY5O3cGTee-NHT1_OQ6r-OJa_GdKqkb_dnUW9mUQuZ7sc0b3uui2q0Xc9WeKtKEKAer6sfzqwKs6qRHaJZDBrOHULOFMxo5GyD0EAnYprs-OS04vDSAVIbV-nQTPa5X3hm8ewMr3Brjz-Moi3TfQpKjnsMbqM-r7daCrgDoANwTiXbck50vO6ZrpIqqiPHMJsNFdJ4LzIQKmFmNlxozKHk2Wc3lKte0tozNX1sXUzU_IHys7V62Q","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1613499286,"updated":1613499286,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '8f7e462a-88b1-49b5-910b-7fef000b20d5',
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
  'Tue, 16 Feb 2021 18:14:46 GMT',
  'Content-Length',
  '721'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test2/46c991f8f05c4e05b500994143142009')
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
  '0197f540-9e37-4bd1-b76b-77d10f78f547',
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
  'Tue, 16 Feb 2021 18:14:45 GMT'
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
  '9279b75c-32a1-4936-bb0b-7d6e66134400',
  'x-ms-ests-server',
  '2.1.11496.5 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AlYh5w5_onJDnZLEqg70g4sA4qsDEQAAAIACvtcOAAAA; expires=Thu, 18-Mar-2021 18:14:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 16 Feb 2021 18:14:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test2/46c991f8f05c4e05b500994143142009')
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/46c991f8f05c4e05b500994143142009","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qRFJ3T7WSY3G33SkQKKeHRGmqsCkrmSa244LihJNPr2KSda0FBBiGtmcckKba2aGE6x7QEkDZh0-IFDmfTnm8_S_pHni0yamr0pY5O3cGTee-NHT1_OQ6r-OJa_GdKqkb_dnUW9mUQuZ7sc0b3uui2q0Xc9WeKtKEKAer6sfzqwKs6qRHaJZDBrOHULOFMxo5GyD0EAnYprs-OS04vDSAVIbV-nQTPa5X3hm8ewMr3Brjz-Moi3TfQpKjnsMbqM-r7daCrgDoANwTiXbck50vO6ZrpIqqiPHMJsNFdJ4LzIQKmFmNlxozKHk2Wc3lKte0tozNX1sXUzU_IHys7V62Q","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1613499286,"updated":1613499286,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'f17be6a3-2acf-4875-b10e-5a7c666fb437',
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
  'Tue, 16 Feb 2021 18:14:46 GMT',
  'Content-Length',
  '721'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/46c991f8f05c4e05b500994143142009/sign', {"alg":"RS384","value":"KOG6UkGPorV1g8WNtPmBbAIRxq22nbC6vBvhtkWKXcFz7QitxK5C-bzwjb2hbWm7"})
  .query(true)
  .reply(200, {"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/46c991f8f05c4e05b500994143142009","value":"KHBj9RcG5ZRHJiqYlPY9x8HurA78zw_8NBYpiUZEp0a1k6MErVErwi8Ex9z8AhwMc61d-tUf69cdDd355zEVxdUceltrNlVm266QQPVjanO4iZS8A9Vg8loe3iLULAVFYgIljn2VmLwgrqGv9MB9ASwmYYzwqyNwMixOMTUkB-Wvh3csqR0e_9UZ2Zs2XqfNT5SmFVt759eZvyA2kuOxfxTWNIt6jXqbrmqt9Qhq89h0yRePYb9OC7Tg3ducVl7rb7l4AJxzbddC7TZ5p6GIS8-MIIYix9Nc1Bbz4vfp5--bv2vYr_ljuFsLF9KdR1YrEB0hY9-jqPhTt2ywJmvajQ"}, [
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
  '0feebc94-0899-40a4-bde0-c0e6dc54da12',
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
  'Tue, 16 Feb 2021 18:14:46 GMT',
  'Content-Length',
  '476'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test2/46c991f8f05c4e05b500994143142009/verify', {"alg":"RS384","digest":"KOG6UkGPorV1g8WNtPmBbAIRxq22nbC6vBvhtkWKXcFz7QitxK5C-bzwjb2hbWm7","value":"KHBj9RcG5ZRHJiqYlPY9x8HurA78zw_8NBYpiUZEp0a1k6MErVErwi8Ex9z8AhwMc61d-tUf69cdDd355zEVxdUceltrNlVm266QQPVjanO4iZS8A9Vg8loe3iLULAVFYgIljn2VmLwgrqGv9MB9ASwmYYzwqyNwMixOMTUkB-Wvh3csqR0e_9UZ2Zs2XqfNT5SmFVt759eZvyA2kuOxfxTWNIt6jXqbrmqt9Qhq89h0yRePYb9OC7Tg3ducVl7rb7l4AJxzbddC7TZ5p6GIS8-MIIYix9Nc1Bbz4vfp5--bv2vYr_ljuFsLF9KdR1YrEB0hY9-jqPhTt2ywJmvajQ"})
  .query(true)
  .reply(200, {"value":true}, [
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
  '8c7cc61b-088b-453d-b98d-9ae6c8ad4904',
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
  'Tue, 16 Feb 2021 18:14:46 GMT',
  'Content-Length',
  '14'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test2')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test2","deletedDate":1613499287,"scheduledPurgeDate":1614104087,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/46c991f8f05c4e05b500994143142009","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qRFJ3T7WSY3G33SkQKKeHRGmqsCkrmSa244LihJNPr2KSda0FBBiGtmcckKba2aGE6x7QEkDZh0-IFDmfTnm8_S_pHni0yamr0pY5O3cGTee-NHT1_OQ6r-OJa_GdKqkb_dnUW9mUQuZ7sc0b3uui2q0Xc9WeKtKEKAer6sfzqwKs6qRHaJZDBrOHULOFMxo5GyD0EAnYprs-OS04vDSAVIbV-nQTPa5X3hm8ewMr3Brjz-Moi3TfQpKjnsMbqM-r7daCrgDoANwTiXbck50vO6ZrpIqqiPHMJsNFdJ4LzIQKmFmNlxozKHk2Wc3lKte0tozNX1sXUzU_IHys7V62Q","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1613499286,"updated":1613499286,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '728ddc1b-4ee7-4da6-987b-13b5531b6a8f',
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
  'Tue, 16 Feb 2021 18:14:46 GMT',
  'Content-Length',
  '881'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'x-ms-request-id',
  '2f1180e6-9402-4040-9342-1c332257bf54',
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
  'Tue, 16 Feb 2021 18:14:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'x-ms-request-id',
  'bf62c7ca-5acb-47fc-8a5f-8ac030025cfe',
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
  'Tue, 16 Feb 2021 18:14:46 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'x-ms-request-id',
  'a63572ab-4dc7-4a62-9e61-6a4fa8283d9c',
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
  'Tue, 16 Feb 2021 18:14:48 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'x-ms-request-id',
  'b8ecde27-dda7-48c3-acf2-38924b64a2aa',
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
  'Tue, 16 Feb 2021 18:14:51 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Deleted Key not found: cryptography-client-test2"}}, [
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
  'x-ms-request-id',
  '4aa8551e-262c-4122-8b4d-607fd80eca40',
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
  'Tue, 16 Feb 2021 18:14:53 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test2')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test2","deletedDate":1613499287,"scheduledPurgeDate":1614104087,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test2/46c991f8f05c4e05b500994143142009","kty":"RSA-HSM","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qRFJ3T7WSY3G33SkQKKeHRGmqsCkrmSa244LihJNPr2KSda0FBBiGtmcckKba2aGE6x7QEkDZh0-IFDmfTnm8_S_pHni0yamr0pY5O3cGTee-NHT1_OQ6r-OJa_GdKqkb_dnUW9mUQuZ7sc0b3uui2q0Xc9WeKtKEKAer6sfzqwKs6qRHaJZDBrOHULOFMxo5GyD0EAnYprs-OS04vDSAVIbV-nQTPa5X3hm8ewMr3Brjz-Moi3TfQpKjnsMbqM-r7daCrgDoANwTiXbck50vO6ZrpIqqiPHMJsNFdJ4LzIQKmFmNlxozKHk2Wc3lKte0tozNX1sXUzU_IHys7V62Q","e":"AAEAAQ"},"attributes":{"enabled":true,"created":1613499286,"updated":1613499286,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '270e4877-e451-441b-85d4-5c0cc45950e2',
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
  'Tue, 16 Feb 2021 18:14:54 GMT',
  'Content-Length',
  '881'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test2')
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
  'x-ms-request-id',
  '2f0a52f5-c282-4aef-88b3-ae01ad7142c1',
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
  'Tue, 16 Feb 2021 18:14:55 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1613499295,"scheduledPurgeDate":1614104095,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/b736244fba8f4e00bfb02ada9546c1b2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"3p3tTxDNSbN3k28P6QtI87qLmyMe7ywmyExdDHgVIHg8dK_qJDkvUbBK-e9_KCaNj5lBvF29tFGCt94nEtU6Sh5dCBE-7F517jukVTRjvjXBSqJvt49wZpIhlG1EDkiVkpOtGUu6aAAeMo1YuP2xg7ktsIUpX5SgnWmM1ztqvDdauT9C5Jkjz4_RAp5eucKtaBZavpnEab3y9H-JcLU3GAKsIWDKJDpYaQcBpMXLSklt6jhFOFCOLZC5eA5t3SDj2GrB65iNrx-Uj9JmX9W8e05oTQvuCh9Vy8uJoszBiSQ1j6bSeZp2Qhbntt9cTFzjedoO1wdKQ7uU5U37IKlPFQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613499285,"updated":1613499285,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'e1e882db-9dcf-4203-8e8c-65416f206106',
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
  'Tue, 16 Feb 2021 18:14:55 GMT',
  'Content-Length',
  '873'
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
  'x-ms-request-id',
  'e3f40f87-4610-405a-9a63-116538774ce3',
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
  'Tue, 16 Feb 2021 18:14:55 GMT'
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
  'x-ms-request-id',
  '8878de8d-d602-4d81-b08d-1cb73f7bf3c6',
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
  'Tue, 16 Feb 2021 18:14:55 GMT'
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
  'x-ms-request-id',
  '6741478e-1882-4d13-b564-12fc42a269ba',
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
  'Tue, 16 Feb 2021 18:14:57 GMT'
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
  'x-ms-request-id',
  '81586824-33cd-4dfb-a6a6-a12706e8493e',
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
  'Tue, 16 Feb 2021 18:14:58 GMT'
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
  'x-ms-request-id',
  '62eac834-2063-4955-aafc-42d77be0a0cb',
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
  'Tue, 16 Feb 2021 18:15:00 GMT'
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
  'x-ms-request-id',
  '75633ad2-fcbe-4386-a321-b7e5a96ddb17',
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
  'Tue, 16 Feb 2021 18:15:03 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/cryptography-client-test","deletedDate":1613499295,"scheduledPurgeDate":1614104095,"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/b736244fba8f4e00bfb02ada9546c1b2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"3p3tTxDNSbN3k28P6QtI87qLmyMe7ywmyExdDHgVIHg8dK_qJDkvUbBK-e9_KCaNj5lBvF29tFGCt94nEtU6Sh5dCBE-7F517jukVTRjvjXBSqJvt49wZpIhlG1EDkiVkpOtGUu6aAAeMo1YuP2xg7ktsIUpX5SgnWmM1ztqvDdauT9C5Jkjz4_RAp5eucKtaBZavpnEab3y9H-JcLU3GAKsIWDKJDpYaQcBpMXLSklt6jhFOFCOLZC5eA5t3SDj2GrB65iNrx-Uj9JmX9W8e05oTQvuCh9Vy8uJoszBiSQ1j6bSeZp2Qhbntt9cTFzjedoO1wdKQ7uU5U37IKlPFQ","e":"AQAB"},"attributes":{"enabled":true,"created":1613499285,"updated":1613499285,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'ff758001-163d-48b0-b8c5-d61e16ef7858',
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
  '873'
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
  'x-ms-request-id',
  'e322eafc-fa72-4d47-9072-6722e39ce9f9',
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

let nock = require('nock');

module.exports.hash = "6a4fed7ad76ddb8096f393c9f6632419";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/resourcegroups/marytest')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147c5eca3471fdd6dd693665a17abb6a896cddd877be70fefcf0eceb7ef4d3f7db0bdbfbbb7bffd7077fa60fb607abef3603a9b9cefedefdeadf3a65ad7d3fcf3ba5aaf9abb8bacbe6ef3a6fd68f4d1325be404d4fba4bd5ee1932f8a695d35d5793b7ea52f371d30d4b6aca619d0a0f679d6b46b7cd66617cd478f7e317eeed2e780bc2b1fefe99f7b1ffd92d147abba5ae5755be4dc98feba2c1a82542c2f5eb7590b0c5eafa7d33c9fe5b38f7ec92ff97f00b18f4e65fc000000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11998',
  'x-ms-request-id',
  'dd363332-9fe7-4049-8dea-43f633c809a1',
  'x-ms-correlation-request-id',
  'dd363332-9fe7-4049-8dea-43f633c809a1',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220118T090437Z:dd363332-9fe7-4049-8dea-43f633c809a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jan 2022 09:04:36 GMT',
  'Content-Length',
  '298'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/resourceGroups/marytest/providers/Microsoft.Network/virtualNetworks/test', {"location":"eastus","properties":{"addressSpace":{"addressPrefixes":["10.0.0.0/16"]}}})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947cb6c917ff428fda8cd9bf6a3117f54ccf0c1dd663d69a675b16a8b6ad9dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd3fafabf5aab9bbc8ea6bc0bdbbaaabcb6296d7cddd2f8a695d35d5793b7e91b75755fdf6ee6551b7ebacd43f9bbb784111c9dbec02a87cf7eeeffbd1fdfcd36c7ffa60b2fde0e1c34fb7f71fce76b60f0e3ecdb7f766fbe7f7b27bfbf7771f9cffbe1fe98bedf58a0775636fdabeaca619868977f2ac69d7e60b427c95d76d9137f415134c3ebc2c1a6a5e2c2f5eb759cb5dbd5e4fa7793ecb67f22635b3c4580b417727bbf776a79fdedbde9fdda37feecd88827bd9f9f6ce6ebe339d4cb3870f1eba97b3d98cde6f5eafb229c06bd7ee8b97757e5ebc63b4be67bea36f7777c6fcdfdddd4f3f321f7f5f7ef9250634cdeb326ff9cdef9bcf42b2bcccf39ac61636c997d9a4cc9fce2aeabb6af3a9d2eb3c2b9b1c4d7ec96f9c","fc92ff078daa410653020000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '1707031e-b9a2-410b-89ee-789bfa35feeb',
  'Azure-AsyncOperation',
  'https://management.azure.com/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/providers/Microsoft.Network/locations/eastus/operations/1707031e-b9a2-410b-89ee-789bfa35feeb?api-version=2021-05-01',
  'x-ms-correlation-request-id',
  '6d361dab-36a6-45dc-b1f5-9cacd733521b',
  'Azure-AsyncNotification',
  'Enabled',
  'x-ms-arm-service-request-id',
  'bfbfe57a-61a9-4549-a322-d3e3a30d2001',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1198',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220118T090439Z:6d361dab-36a6-45dc-b1f5-9cacd733521b',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jan 2022 09:04:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/providers/Microsoft.Network/locations/eastus/operations/1707031e-b9a2-410b-89ee-789bfa35feeb')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e9474d9bb5ebe6a347e947afd7d3699ecff2d947bf71f24b","fe1f4f9490471d000000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  'ca75654b-14ff-43d6-924a-2790d959e5d8',
  'x-ms-correlation-request-id',
  '3e2a1929-4ce9-4307-bc66-4763d69e2cc8',
  'x-ms-arm-service-request-id',
  'be20b1b3-a308-41a6-9d8a-4c812f17cc60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11997',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220118T090439Z:3e2a1929-4ce9-4307-bc66-4763d69e2cc8',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jan 2022 09:04:38 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/resourceGroups/marytest/providers/Microsoft.Network/virtualNetworks/test')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947cb6c917ff428fda8cd9bf6a3117f54ccf0c1dd663d69a675b16a8b6ad9dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd3fafabf5aab9bbc8ea6bc0bdbbaaabcb6296d7cddd2f8a695d35d5793b7e91b75755fdf6ee6551b7ebacd43f9bbb784111c9dbec02a87cf7eeeffbd1fdfcd36c7ffa60b2fde0e1c34fb7f71fce76b60f0e3ecdb7f766fbe7f7b27bfbf7771f9cffbe1fe98bedf58a0775636fdabeaca619868977f2ac69d7e60b427c95d76d9137f415134c3ebc2c1a6a5e2c2f5eb759cb5dbd5e4fa7793ecb67f22635b3c4580b417727bbf776a79fdedbde9fdda37feecd88827bd9f9f6ce6ebe339d4cb3870f1eba97b3d98cde6f5eafb229c06bd7ee8b97757e5ebc63b4be67bea36f7777c6fcdfdddd4f3f321f7f5f7ef9250634cdeb326ff9cdef9bcf42b2bcccf39ac61636c997d9a4cc9fce2aeabb6af3a9d2eb3c2b9b1c4d7ec96f9c","fc92ff078daa410653020000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"5e6a4c7b-7996-49d0-886e-2d4f3a34517f"',
  'Vary',
  'Accept-Encoding',
  'x-ms-request-id',
  '9a867bd0-cf7d-4c6e-8697-08bbea1e048d',
  'x-ms-correlation-request-id',
  '69e3273b-4832-4576-b67a-c377f1d5c368',
  'x-ms-arm-service-request-id',
  '0283c71e-4081-4e8b-b03f-86d32a7cffd6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11996',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20220118T090441Z:69e3273b-4832-4576-b67a-c377f1d5c368',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 18 Jan 2022 09:04:41 GMT'
]);

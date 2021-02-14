let nock = require('nock');

module.exports.hash = "bb5bbc6c8e4f7cc4f0ab19827627c280";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3d38d879787cb0b7ff64efc9eeeeeffb11b55a668b9cbe5e5c6f673f58d7f9b683b5bd4b5f9f57f52203624d55d6f4b77eddd0275f2d8b369fa5afdb8c901da5c19f69759e1e2ff2ba9866e96747e957af8f7fdfe577b3665e2c2fda6a394af1fb18df7cf79880e6cb697dbd6a8b6af97be5d71f3d5aaecbf297fc3ffae250851c010000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8809A824B2B11"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '0d05c64c-0d0f-434d-a298-d97a74703916',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:20:42 GMT',
  'Content-Length',
  '333' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/synonymmaps(%27my-azure-synonymmap-1%27)', {"name":"my-azure-synonymmap-1","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA\nCalifornia, Clif. => CA","encryptionKey":null,"@odata.etag":"\"0x8D8809A824B2B11\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3d38d879787c70ffdededee9fedeeffb11b55a668b9cbe5e5c6f673f58d7f9b683b5bd4b5f9f57f52203624d55d6f4b77eddd0275f2d8b369fa5afdb8c901da5c19f69759e1e2ff2ba9866e96747e957af8f7fdfe577b3665e2c2fda6a394af1fb18df7c97be38c9ca82fa5916d9283da15ff98b9363ea2d5f4eebeb555b54cbdf2bbffee8d1725d96bfe4ff011a270f7735010000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8809A85322E42"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '8c2da308-2aaa-4965-9692-c2f852eca544',
  'elapsed-time',
  '26',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:20:42 GMT',
  'Content-Length',
  '350' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3d38d879787c70ffdededee9fedeeffb11b55a668b9cbe5e5c6f673f58d7f9b683b5bd4b5f9f57f52203624d55d6f4b77eddd0275f2d8b369fa5afdb8c901da5c19f69759e1e2ff2ba9866e96747e957af8f7fdfe577b3665e2c2fda6a394af1fb18df7c97be38c9ca82fa5916d9283da15ff98b9363ea2d5f4eebeb555b54cbdf2bbffee8d1725d96bfe4ff011a270f7735010000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8809A85322E42"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '53476a7f-52ee-4c6d-b97e-8c1d5590f68d',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:20:42 GMT',
  'Content-Length',
  '350' ]);

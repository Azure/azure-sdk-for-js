let nock = require('nock');

module.exports.hash = "723906b7d44c3d772d312a8f1010a191";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fe39fa65ad7d3bcb9fbbbe5cbb668af3f1a19c0d4e882a0febe1fedbc3b787a70efe9d3d3d3bdbd87bbf7efddfb7d3fa256cb6c91d3d78beb6db4de1630dbbbf4cd2c6fa675b16a8b6af9d1a3e5ba2c471fb5d72b349e56cda26a66136ad4ac27f2a13498d6f90c086465f3d1a35f4c0d97cb7c0a08afdbba58121e68f64ba81d8d362b96798d568ac2bc6a737a6df4d12f5ae7f5b56d0ab44ee6d9f2227f9ab702ec655516536d210d9ee6658e6f069ae4cb697dcd23f9bd72fdf097fc3f6f51e6d57a010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDEE2291533"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '9714506e-754c-437f-94c0-f6475fca2368',
  'elapsed-time',
  '9',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:11:26 GMT',
  'Content-Length',
  '365' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-1%27)', {"name":"my-data-source-1","description":"my-data-source-1","type":"cosmosdb","credentials":{"connectionString":"<unchanged>"},"container":{"name":"my-container-2","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"@odata.etag":"\"0x8D83DDEE2291533\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fe39fa65ad7d3bcb9fbbbe5cbb668af3f1a19c0d4e882a0febe1fedbc3b787a70efe9d3d3d383e327f74e1fecfdbe1f51ab65b6c8e9ebc5f5365a6f0b98ed5dfa669637d3ba58b545b58c3768af5778755a358baa994de893663d910f97ebb21c7d34adf319d0c9cae6a347bf981a2e97f914f05eb775b124acd0ec97503b1a7b562cf31aad1c42f6e3ed3d82fd8bd6797d6d5f012e27f36c79913fcd5b01fab22a8ba9b690064ff332c737034df2e5b4bee6f1fd5eb97ef84bfe1fd776915f90010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDEE8AB3E72"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '116fa4df-6ac6-45f4-92d1-e256ad37ec19',
  'elapsed-time',
  '64',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:11:26 GMT',
  'Content-Length',
  '362' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fe39fa65ad7d3bcb9fbbbe5cbb668af3f1a19c0d4e882a0febe1fedbc3b787a70efe9d3d3d383e327f74e1fecfdbe1f51ab65b6c8e9ebc5f5365a6f0b98ed5dfa669637d3ba58b545b58c3768af5778755a358baa994de893663d910f97ebb21c7d34adf319d0c9cae6a347bf981a2e97f914f05eb775b124acd0ec97503b1a7b562cf31aad1c42f6e3ed3d82fd8bd6797d6d5f012e27f36c79913fcd5b01fab22a8ba9b690064ff332c737034df2e5b4bee6f1fd5eb97ef84bfe1fd776915f90010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDEE8AB3E72"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '17a782ff-762c-4bef-a177-6281e4bc6de1',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:11:26 GMT',
  'Content-Length',
  '362' ]);

let nock = require('nock');

module.exports.hash = "723906b7d44c3d772d312a8f1010a191";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fe39fa65ad7d3bcb9fbbbe5cbb668af3f1a19c0d4e882a0febe1fedbc3b787a70efe9d39367f777f78f779e9efcbe1f51ab65b6c8e9ebc5f5365a6f0b98ed5dfa669637d3ba58b545b5fce8d1725d96a38fdaeb151a4fab665135b309356ad613f9501a4ceb7c0604b2b2f9e8d12fa686cb653e0584d76d5d2c090f34fb25d48e469b15cbbc462b45615eb539bd36fae817adf3fada36055a27f36c79913fcd5b01f6b22a8ba9b690064ff332c737034df2e5b4bee691fc5eb97ef84bfe1f3cde216b7a010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDCF514A0DC"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'dd5175fb-ee52-4f38-b564-28cdb532b91a',
  'elapsed-time',
  '13',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:57:39 GMT',
  'Content-Length',
  '365' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-1%27)', {"name":"my-data-source-1","description":"my-data-source-1","type":"cosmosdb","credentials":{"connectionString":"<unchanged>"},"container":{"name":"my-container-2","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"@odata.etag":"\"0x8D83DDCF514A0DC\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fe39fa65ad7d3bcb9fbbbe5cbb668af3f1a19c0d4e882a0febe1fedbc3b787a70efe9d393674f4e774f1e3cbbfffb7e44ad96d922a7af17d7db68bd2d60b677e99b59de4ceb62d516d532dea0bd5ee1d569d52caa6636a14f9af5443e5caecb72f4d1b4ce6740272b9b8f1efd626ab85ce653c07bddd6c592b042b35f42ed68ec59b1cc6bb47208d98fb7f708f62f5ae7f5b57d05b89cccb3e545fe346f05e8cbaa2ca6da421a3ccdcb1cdf0c34c997d3fa9ac7f77be5fae12ff97f005fb0213b90010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDCFBE1C7F5"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '7fedf067-0c41-420c-9624-e71ef8af581b',
  'elapsed-time',
  '74',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:57:40 GMT',
  'Content-Length',
  '363' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fe39fa65ad7d3bcb9fbbbe5cbb668af3f1a19c0d4e882a0febe1fedbc3b787a70efe9d393674f4e774f1e3cbbfffb7e44ad96d922a7af17d7db68bd2d60b677e99b59de4ceb62d516d532dea0bd5ee1d569d52caa6636a14f9af5443e5caecb72f4d1b4ce6740272b9b8f1efd626ab85ce653c07bddd6c592b042b35f42ed68ec59b1cc6bb47208d98fb7f708f62f5ae7f5b57d05b89cccb3e545fe346f05e8cbaa2ca6da421a3ccdcb1cdf0c34c997d3fa9ac7f77be5fae12ff97f005fb0213b90010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDCFBE1C7F5"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '19b8127b-e64d-4d8a-9077-d0fba352fc29',
  'elapsed-time',
  '9',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:57:40 GMT',
  'Content-Length',
  '363' ]);

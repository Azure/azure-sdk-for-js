let nock = require('nock');

module.exports.hash = "16bceedc9f31adc3045f63093c4854a1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-6%27)', {"name":"my-data-source-6","type":"cosmosdb","credentials":{"connectionString":"AccountEndpoint=https://hotels-docbb.documents.azure.com:443/;AccountKey=4UPsNZyFAjgZ1tzHPGZaxS09XcwLrIawbXBWk6IixcxJoSePTcjBn0mi53XiKWu8MaUgowUhIovOv7kjksqAug==;Database=SampleData"},"container":{"name":"hotels"}})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#datasources/$entity","@odata.etag":"\"0x8D83DDEE01EE3F8\"","name":"my-data-source-6","description":null,"type":"cosmosdb","subtype":null,"credentials":{"connectionString":null},"container":{"name":"hotels","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83DDEE01EE3F8"',
  'Location',
  'https://endpoint/datasources(\'my-data-source-6\')?api-version=2020-06-30',
  'request-id',
  '569da9ca-5118-406f-b568-51cab3834e2b',
  'elapsed-time',
  '85',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:11:11 GMT',
  'Content-Length',
  '378' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-6%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fe39fa65ad7d3bcb9fbbbe5cbb668af3f1a19c0d4e882a0febe1fedbc3b787a70efe9d3d3d39dddd3d37bcf0e7edf8fa8d5325be4f4f5e27a1badb705ccf6a7f4cd2c6fa675b16a8b6af9d1a3e5ba2c471fb5d72b349e56cda26a66136ad4ac27f2a13498d6f90c086465f3d1a35f4c0d97cb7c0a08afdbba58121e68f64ba81d8d362b96798d568ac2bc6a737a6df4d12f5ae7f5b56d0ab44ee6d9f2227f9ab702ec655516536d210d9ee6658e6f069ae4cb697dcd23f9bd72fdf097fc3f699c365e7a010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDEE01EE3F8"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '85b7fc24-cfce-41ed-8b0d-e22af342e8d0',
  'elapsed-time',
  '11',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:11:12 GMT',
  'Content-Length',
  '365' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/datasources(%27my-data-source-6%27)')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'a830af56-e1a9-4147-979c-43a0eff70a12',
  'elapsed-time',
  '18',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:11:12 GMT' ]);

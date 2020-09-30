let nock = require('nock');

module.exports.hash = "dcce0b7a95010d0214a1ad01f870f73b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-3%27)', {"name":"my-data-source-3","type":"cosmosdb","credentials":{"connectionString":"AccountEndpoint=https://hotels-docbb.documents.azure.com:443/;AccountKey=4UPsNZyFAjgZ1tzHPGZaxS09XcwLrIawbXBWk6IixcxJoSePTcjBn0mi53XiKWu8MaUgowUhIovOv7kjksqAug==;Database=SampleData"},"container":{"name":"hotels"}})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#datasources/$entity","@odata.etag":"\"0x8D86247F2BA65D4\"","name":"my-data-source-3","description":null,"type":"cosmosdb","subtype":null,"credentials":{"connectionString":null},"container":{"name":"hotels","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D86247F2BA65D4"',
  'Location',
  'https://endpoint/datasources(\'my-data-source-3\')?api-version=2020-06-30',
  'request-id',
  'e42f0a91-7ddc-4c5a-a954-1aa9868497fb',
  'elapsed-time',
  '64',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:14:02 GMT',
  'Content-Length',
  '381' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f3edddb7ff06cefc9f1a7f79feeffbe1f51ab65b6c8e9ebc5f5365a6f0b98ed7bf4cd2c6fa675b16a8b6af9d1a3e5ba2c471fb5d72b349e56cda26a66136ad4ac27f2a13498d6f90c086465f3d1a35f4c0d97cb7c0a08afdbba58121e68f64ba81d0d382b96798d568ac2bc6a737a6df4d12f5ae7f5b56d0ab44ee6d9f2227f9ab702ec655516536d210d9ee6658e6f069ae4cb697dcd23f9bd72fdf097fc3fc08b16c57d010000"], [ 'Cache-Control',
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
  'W/"0x8D86247F2BA65D4"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'ea744781-f187-4a43-8f47-b72c96487d5a',
  'elapsed-time',
  '29',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:14:02 GMT',
  'Content-Length',
  '367' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/datasources(%27my-data-source-3%27)')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'ec3b5856-ae32-4b76-8f35-fc4347e3ebdf',
  'elapsed-time',
  '17',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:14:02 GMT' ]);

let nock = require('nock');

module.exports.hash = "5fe96f92a28713e1a27928095e27bd5f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-3%27)', {"name":"my-data-source-3","type":"cosmosdb","credentials":{"connectionString":"AccountEndpoint=https://hotels-docbb.documents.azure.com:443/;AccountKey=4UPsNZyFAjgZ1tzHPGZaxS09XcwLrIawbXBWk6IixcxJoSePTcjBn0mi53XiKWu8MaUgowUhIovOv7kjksqAug==;Database=SampleData"},"container":{"name":"hotels"}})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#datasources/$entity","@odata.etag":"\"0x8D8BE6ADB3FD718\"","name":"my-data-source-3","description":null,"type":"cosmosdb","subtype":null,"credentials":{"connectionString":null},"container":{"name":"hotels","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"encryptionKey":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8BE6ADB3FD718"',
  'Location',
  "https://endpoint/datasources('my-data-source-3')?api-version=2020-06-30",
  'request-id',
  'b2d2300e-4df5-434b-9c7e-9a43b8353f29',
  'elapsed-time',
  '40',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:15:42 GMT',
  'Content-Length',
  '381'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f9e9c7e7afcf4c9bd674f1fec1efcbe1f51ab65b6c8e9ebc5f5365a6f0b98ed7bf4cd2c6fa675b16a8b6af9d1a3e5ba2c471fb5d72b349e56cda26a66136ad4ac27f2a13498d6f90c086465f3d1a35f4c0d97cb7c0a08afdbba58121e68f64ba81d0d382b96798d568ac2bc6a737a6df4d12f5ae7f5b56d0ab44ee6d9f2227f9ab702ec655516536d210d9ee6658e6f069ae4cb697dcd23f9bd72fdf097fc3f6eb7484b7d010000"], [
  'Cache-Control',
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
  'W/"0x8D8BE6ADB3FD718"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'f9236f6d-2977-4b22-9867-e8255ab30584',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:15:42 GMT',
  'Content-Length',
  '367'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/datasources(%27my-data-source-3%27)')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'c90cbe4b-c424-4244-8f61-b7105100ac30',
  'elapsed-time',
  '19',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:15:42 GMT'
]);

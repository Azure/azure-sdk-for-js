let nock = require('nock');

module.exports.hash = "6cace7d322e4701566a537ad837dce84";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f9e9c7e7a7cf2e0c9c1a74f9f3cf97d3fa256cb6c91d3d78beb6db4de1630dbbbf4cd2c6fa675b16a8b6af9d1a3e5ba2c471fb5d72b349e56cda26a66136ad4ac27f2a13498d6f90c086465f3d1a35f4c0d97cb7c0a08afdbba58121e68f64ba81d0d382b96798d568ac2bc6a737a6df4d12f5ae7f5b56d0ab44ee6d9f2227f9ab702ec655516536d210d9ee6658e6f069ae4cb697dcd23f9bd72fdf097fc3fac167b167d010000"], [
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
  'W/"0x8D8BE6AC7B86DBB"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '919d19f6-dd10-4434-bbc2-6e33145c96bb',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:15:17 GMT',
  'Content-Length',
  '367'
]);

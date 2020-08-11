let nock = require('nock');

module.exports.hash = "723906b7d44c3d772d312a8f1010a191";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0fee3d3dfdf4e47877e760e7c193dff7236ab5cc16397dbdb8de46eb6d01b3bd4bdfccf2665a17abb6a8961f3d5aaecb72f4517bbd42e369d52caa6636a146cd7a221f4a83699dcf804056361f3dfac5d470b9cca780f0baad8b25e18166bf84dad180b36299d768a528ccab36a7d7461ffda2755e5fdba640eb649e2d2ff2a7792bc05e566531d516d2e0695ee6f866a049be9cd6d73c92df2bd70f7fc9ff03dc371ed57d010000"], [ 'Cache-Control',
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
  'W/"0x8D83DE6CA10807B"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '25ebb7c8-86b1-414c-a5a8-7fd8537ee638',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:08:03 GMT',
  'Content-Length',
  '367' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-1%27)', {"name":"my-data-source-1","description":"my-data-source-1","type":"cosmosdb","credentials":{"connectionString":"<unchanged>"},"container":{"name":"my-container-2","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"@odata.etag":"\"0x8D83DE6CA10807B\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0fee3d3dfdf4e9eededea70f9edefb7d3fa256cb6c91d3d78beb6db4de1630dbbbf4cd2c6fa675b16a8b6a196fd05eaff0eab46a1655339bd027cd7a221f2ed76539fa685ae733a09395cd478f7e31355c2ef329e0bd6eeb624958a1d92fa17634fcac58e6355a3984ecc7db7b04fb17adf3fadabe025c4ee6d9f2227f9ab702f4655516536d210d9ee6658e6f069ae4cb697dcde3fbbd72fdf097fc3f99b607b493010000"], [ 'Cache-Control',
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
  'W/"0x8D83DE6D12267D3"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '2f141197-4d36-4844-a18b-26e304bef9f3',
  'elapsed-time',
  '40',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:08:03 GMT',
  'Content-Length',
  '364' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0fee3d3dfdf4e9eededea70f9edefb7d3fa256cb6c91d3d78beb6db4de1630dbbbf4cd2c6fa675b16a8b6a196fd05eaff0eab46a1655339bd027cd7a221f2ed76539fa685ae733a09395cd478f7e31355c2ef329e0bd6eeb624958a1d92fa17634fcac58e6355a3984ecc7db7b04fb17adf3fadabe025c4ee6d9f2227f9ab702f4655516536d210d9ee6658e6f069ae4cb697dcde3fbbd72fdf097fc3f99b607b493010000"], [ 'Cache-Control',
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
  'W/"0x8D83DE6D12267D3"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'c8695cdc-3cd9-48a5-8c21-416461989120',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:08:03 GMT',
  'Content-Length',
  '364' ]);

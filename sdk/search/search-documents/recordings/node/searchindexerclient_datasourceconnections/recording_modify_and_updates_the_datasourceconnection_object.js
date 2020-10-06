let nock = require('nock');

module.exports.hash = "723906b7d44c3d772d312a8f1010a191";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f3edddb7ff06cffc1c9a7fba73bbfef47d46a992d72fa7a71bd8dd6db02667b97be99e5cdb42e566d512d3f7ab45c97e5e8a3f67a85c6d3aa5954cd6c428d9af5443e9406d33a9f0181ac6c3e7af48ba9e172994f01e1755b174bc203cd7e09b5a30167c532afd14a5198576d4eaf8d3efa45ebbcbeb64d81d6c93c5b5ee44ff35680bdacca62aa2da4c1d3bcccf1cd40937c39adaf7924bf57ae1ffe92ff07934980927d010000"], [ 'Cache-Control',
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
  'W/"0x8D86247F47C64E0"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '876e5bb0-7f92-436a-b554-4e38d09b1be7',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:14:13 GMT',
  'Content-Length',
  '367' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-1%27)', {"name":"my-data-source-1","description":"my-data-source-1","type":"cosmosdb","credentials":{"connectionString":"<unchanged>"},"container":{"name":"my-container-2","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"@odata.etag":"\"0x8D86247F47C64E0\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f3edddb7ff0ece1bda7cf9eeddefb7d3fa256cb6c91d3d78beb6db4de1630dbbbf4cd2c6fa675b16a8b6a196fd05eaff0eab46a1655339bd027cd7a221f2ed76539fa685ae733a09395cd478f7e31355c2ef329e0bd6eeb624958a1d92fa17634fcac58e6355a3984ecc7db7b04fb17adf3fadabe025c4ee6d9f2227f9ab702f4655516536d210d9ee6658e6f069ae4cb697dcde3fbbd72fdf097fc3ff8e5263393010000"], [ 'Cache-Control',
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
  'W/"0x8D86247F93DFF13"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '4bb4a2d4-8a73-4097-aba0-860b88592845',
  'elapsed-time',
  '57',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:14:13 GMT',
  'Content-Length',
  '364' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f3edddb7ff0ece1bda7cf9eeddefb7d3fa256cb6c91d3d78beb6db4de1630dbbbf4cd2c6fa675b16a8b6a196fd05eaff0eab46a1655339bd027cd7a221f2ed76539fa685ae733a09395cd478f7e31355c2ef329e0bd6eeb624958a1d92fa17634fcac58e6355a3984ecc7db7b04fb17adf3fadabe025c4ee6d9f2227f9ab702f4655516536d210d9ee6658e6f069ae4cb697dcde3fbbd72fdf097fc3ff8e5263393010000"], [ 'Cache-Control',
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
  'W/"0x8D86247F93DFF13"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '1ba334bd-6f55-4892-bc8d-b2987a2e8a2a',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:14:13 GMT',
  'Content-Length',
  '364' ]);

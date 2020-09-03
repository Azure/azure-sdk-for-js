let nock = require('nock');

module.exports.hash = "6c8831d627da7ba0998caf5fffec4323";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0ff61fde7fbab77770efdece8327bfef47d46a992d72fa7a71bd8dd6db02667b97be99e5cdb42e566d512d3f7ab45c97e5e8a3f67a85c6d3aa5954cd6c428d9af5443e9406d33a9f0181ac6c3e7af48ba9e172994f01e1755b174bc203cd7e09b5a30167c532afd14a5198576d4eaf8d3efa45ebbcbeb64d81d6c93c5b5ee44ff35680bdacca62aa2da4c1d3bcccf1cd40937c39adaf7924bf57ae1ffe92ff0783765cf47d010000"], [ 'Cache-Control',
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
  'W/"0x8D8495D2283307B"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '919c9e18-0231-4035-ade3-354b7e399a18',
  'elapsed-time',
  '1629',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:13:01 GMT',
  'Content-Length',
  '367' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-1%27)', {"name":"my-data-source-1","description":"my-data-source-1","type":"cosmosdb","credentials":{"connectionString":"<unchanged>"},"container":{"name":"my-container-2","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"@odata.etag":"\"0x8D8495D2283307B\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0ff61fde7fba777aefd9eedefea7bfef47d46a992d72fa7a71bd8dd6db02667b97be99e5cdb42e566d512de30ddaeb155e9d56cda26a6613faa4594fe4c3e5ba2c471f4deb7c0674b2b2f9e8d12fa686cb653e05bcd76d5d2c092b34fb25d48e869f15cbbc462b8790fd787b8f60ffa2755e5fdb5780cbc93c5b5ee44ff35680beacca62aa2da4c1d3bcccf1cd40937c39adaf797cbf57ae1ffe92ff078217fe4093010000"], [ 'Cache-Control',
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
  'W/"0x8D8495D2E3F1246"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'ccd72916-f9ca-4e46-9bb7-a25129c32a95',
  'elapsed-time',
  '1136',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:13:02 GMT',
  'Content-Length',
  '364' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0ff61fde7fba777aefd9eedefea7bfef47d46a992d72fa7a71bd8dd6db02667b97be99e5cdb42e566d512de30ddaeb155e9d56cda26a6613faa4594fe4c3e5ba2c471f4deb7c0674b2b2f9e8d12fa686cb653e05bcd76d5d2c092b34fb25d48e869f15cbbc462b8790fd787b8f60ffa2755e5fdb5780cbc93c5b5ee44ff35680beacca62aa2da4c1d3bcccf1cd40937c39adaf797cbf57ae1ffe92ff078217fe4093010000"], [ 'Cache-Control',
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
  'W/"0x8D8495D2E3F1246"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'ebc428e1-8f1b-4b84-bec4-8d1f61dc113c',
  'elapsed-time',
  '9',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:13:02 GMT',
  'Content-Length',
  '364' ]);

let nock = require('nock');

module.exports.hash = "723906b7d44c3d772d312a8f1010a191";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f9e9c7e7afcf474f7c193a70f9ffebe1f51ab65b6c8e9ebc5f5365a6f0b98ed5dfa669637d3ba58b545b5fce8d1725d96a38fdaeb151a4fab665135b309356ad613f9501a4ceb7c0604b2b2f9e8d12fa686cb653e0584d76d5d2c090f34fb25d48e069c15cbbc462b45615eb539bd36fae817adf3fada36055a27f36c79913fcd5b01f6b22a8ba9b690064ff332c737034df2e5b4bee691fc5eb97ef84bfe1fcb9c21397d010000"], [
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
  'W/"0x8D8BE6ADE17BD9D"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '3e995a84-551c-4eaa-9be4-10163fa8783d',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:15:55 GMT',
  'Content-Length',
  '367'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-1%27)', {"name":"my-data-source-1","description":"my-data-source-1","type":"cosmosdb","credentials":{"connectionString":null},"container":{"name":"my-container-2","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"@odata.etag":"\"0x8D8BE6ADE17BD9D\"","encryptionKey":null})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f9e9c7e7a7cba7772fcecc993fbbfef47d46a992d72fa7a71bd8dd6db02667b97be99e5cdb42e566d512de30ddaeb155e9d56cda26a6613faa4594fe4c3e5ba2c471f4deb7c0674b2b2f9e8d12fa686cb653e05bcd76d5d2c092b34fb25d48e869f15cbbc462b8790fd787b8f60ffa2755e5fdb5780cbc93c5b5ee44ff35680beacca62aa2da4c1d3bcccf1cd40937c39adaf797cbf57ae1ffe92ff0777a8b0d793010000"], [
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
  'W/"0x8D8BE6AE2CAFBB5"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '06c2bb2a-e707-43b0-a4a7-9dacaf3dd6b3',
  'elapsed-time',
  '67',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:15:55 GMT',
  'Content-Length',
  '364'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f9e9c7e7a7cba7772fcecc993fbbfef47d46a992d72fa7a71bd8dd6db02667b97be99e5cdb42e566d512de30ddaeb155e9d56cda26a6613faa4594fe4c3e5ba2c471f4deb7c0674b2b2f9e8d12fa686cb653e05bcd76d5d2c092b34fb25d48e869f15cbbc462b8790fd787b8f60ffa2755e5fdb5780cbc93c5b5ee44ff35680beacca62aa2da4c1d3bcccf1cd40937c39adaf797cbf57ae1ffe92ff0777a8b0d793010000"], [
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
  'W/"0x8D8BE6AE2CAFBB5"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '23f00aea-6c05-4d2f-b7cd-bc5945c6f192',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:15:55 GMT',
  'Content-Length',
  '364'
]);

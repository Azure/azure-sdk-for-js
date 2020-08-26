let nock = require('nock');

module.exports.hash = "23fbbcf7b6740f9ed2b8b343f3ced079";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-3%27)', {"name":"my-data-source-3","type":"cosmosdb","credentials":{"connectionString":"AccountEndpoint=https://hotels-docbb.documents.azure.com:443/;AccountKey=4UPsNZyFAjgZ1tzHPGZaxS09XcwLrIawbXBWk6IixcxJoSePTcjBn0mi53XiKWu8MaUgowUhIovOv7kjksqAug==;Database=SampleData"},"container":{"name":"hotels"}})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#datasources/$entity","@odata.etag":"\"0x8D8495D20C29594\"","name":"my-data-source-3","description":null,"type":"cosmosdb","subtype":null,"credentials":{"connectionString":null},"container":{"name":"hotels","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8495D20C29594"',
  'Location',
  'https://endpoint/datasources(\'my-data-source-3\')?api-version=2020-06-30',
  'request-id',
  '4bbd4463-9dfd-4cd1-89f5-3864fd03c504',
  'elapsed-time',
  '44',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:12:40 GMT',
  'Content-Length',
  '381' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0ff61fde7fbab773b2f7f0fec3fddff7236ab5cc16397dbdb8de46eb6d01b37d8fbe99e5cdb42e566d512d3f7ab45c97e5e8a3f67a85c6d3aa5954cd6c428d9af5443e9406d33a9f0181ac6c3e7af48ba9e172994f01e1755b174bc203cd7e09b5a30167c532afd14a5198576d4eaf8d3efa45ebbcbeb64d81d6c93c5b5ee44ff35680bdacca62aa2da4c1d3bcccf1cd40937c39adaf7924bf57ae1ffe92ff077b9a690b7d010000"], [ 'Cache-Control',
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
  'W/"0x8D8495D20C29594"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'ab45456a-2c22-4c79-b9a8-08031a7c8663',
  'elapsed-time',
  '24',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:12:40 GMT',
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
  'a255060f-eb41-4760-acf4-c24b7f1fa33b',
  'elapsed-time',
  '26',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:12:40 GMT' ]);

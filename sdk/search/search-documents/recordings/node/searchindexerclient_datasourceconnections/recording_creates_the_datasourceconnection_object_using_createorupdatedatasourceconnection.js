let nock = require('nock');

module.exports.hash = "e1ad3c67a85fec3ea7ca3f38c6ab2432";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-6%27)', {"name":"my-data-source-6","type":"cosmosdb","credentials":{"connectionString":"AccountEndpoint=https://hotels-docbb.documents.azure.com:443/;AccountKey=4UPsNZyFAjgZ1tzHPGZaxS09XcwLrIawbXBWk6IixcxJoSePTcjBn0mi53XiKWu8MaUgowUhIovOv7kjksqAug==;Database=SampleData"},"container":{"name":"hotels"}})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#datasources/$entity","@odata.etag":"\"0x8D83E832B93940F\"","name":"my-data-source-6","description":null,"type":"cosmosdb","subtype":null,"credentials":{"connectionString":null},"container":{"name":"hotels","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83E832B93940F"',
  'Location',
  'https://endpoint/datasources(\'my-data-source-6\')?api-version=2020-06-30',
  'request-id',
  'e0df54bb-f82b-4f66-aa53-e70c2ee8e958',
  'elapsed-time',
  '67',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:47:16 GMT',
  'Content-Length',
  '381' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-6%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0fee9d1edcdb7bf2f0dec3fd9d67bfef47d46a992d72fa7a71bd8dd6db0266fb53fa669637d3ba58b545b5fce8d1725d96a38fdaeb151a4fab665135b309356ad613f9501a4ceb7c0604b2b2f9e8d12fa686cb653e0584d76d5d2c090f34fb25d48e069c15cbbc462b45615eb539bd36fae817adf3fada36055a27f36c79913fcd5b01f6b22a8ba9b690064ff332c737034df2e5b4bee691fc5eb97ef84bfe1f92580ed17d010000"], [ 'Cache-Control',
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
  'W/"0x8D83E832B93940F"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '64b881df-28b6-40dc-a7b0-be14a6dd41dc',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:47:16 GMT',
  'Content-Length',
  '367' ]);

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
  'cba66465-9e75-43ee-af2f-f1d785f1caab',
  'elapsed-time',
  '21',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:47:16 GMT' ]);

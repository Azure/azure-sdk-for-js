let nock = require('nock');

module.exports.hash = "dcce0b7a95010d0214a1ad01f870f73b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/datasources(%27my-data-source-3%27)', {"name":"my-data-source-3","type":"cosmosdb","credentials":{"connectionString":"AccountEndpoint=https://hotels-docbb.documents.azure.com:443/;AccountKey=4UPsNZyFAjgZ1tzHPGZaxS09XcwLrIawbXBWk6IixcxJoSePTcjBn0mi53XiKWu8MaUgowUhIovOv7kjksqAug==;Database=SampleData"},"container":{"name":"hotels"}})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#datasources/$entity","@odata.etag":"\"0x8D8612C1629F5C4\"","name":"my-data-source-3","description":null,"type":"cosmosdb","subtype":null,"credentials":{"connectionString":null},"container":{"name":"hotels","query":null},"dataChangeDetectionPolicy":null,"dataDeletionDetectionPolicy":null,"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8612C1629F5C4"',
  'Location',
  'https://endpoint/datasources(\'my-data-source-3\')?api-version=2020-06-30',
  'request-id',
  '82384360-4b88-46db-85c4-4624204af9bd',
  'elapsed-time',
  '65',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:22:04 GMT',
  'Content-Length',
  '381' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0f3edddd3bd9fd74efe1b3fb27fbbfef47d46a992d72fa7a71bd8dd6db0266fb1e7d33cb9b695dacdaa25a7ef468b92ecbd147edf50a8da755b3a89ad9841a35eb897c280da6753e030259d97cf4e81753c3e5329f02c2ebb62e9684079afd126a4703ce8a655ea395a230afda9c5e1b7df48bd6797d6d9b02ad9379b6bcc89fe6ad007b5995c5545b4883a77999e39b8126f9725a5ff3487eaf5c3ffc25ff0fe665501a7d010000"], [ 'Cache-Control',
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
  'W/"0x8D8612C1629F5C4"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '7957085f-caba-41b6-a7a5-eadf4950822d',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:22:04 GMT',
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
  '490b6950-b66a-4c39-adf1-cf439c7cf5b1',
  'elapsed-time',
  '20',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:22:04 GMT' ]);

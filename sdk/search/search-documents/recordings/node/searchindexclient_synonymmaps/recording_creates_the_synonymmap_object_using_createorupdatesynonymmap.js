let nock = require('nock');

module.exports.hash = "77efeae6efb37c45c0860823c31af0d4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/synonymmaps(%27my-azure-synonymmap-3%27)', {"name":"my-azure-synonymmap-3","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA"})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#synonymmaps/$entity","@odata.etag":"\"0x8D8612BADF3BF2E\"","name":"my-azure-synonymmap-3","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA","encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8612BADF3BF2E"',
  'Location',
  'https://endpoint/synonymmaps(\'my-azure-synonymmap-3\')?api-version=2020-06-30',
  'request-id',
  '186cbb76-306a-492f-908d-5d3de4507fdc',
  'elapsed-time',
  '25',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:19:10 GMT',
  'Content-Length',
  '284' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3df87477efc9f1d367f79e3cdb3bfd7d3fa256cb6c91d3d78bebedec07eb3adf76b0b6efd1d7e755bdc88058539535fdad5f37f4c957cba2cd67e9eb3623644769f0675a9da7c78bbc2ea659fad951fad5ebe3df77f9ddac9917cb8bb65a8e52fc3ec637df3d26a0f9725a5fafdaa25afe5ef9f5478f96ebb2fc25ff0fc937aa3f1c010000"], [ 'Cache-Control',
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
  'W/"0x8D8612BADF3BF2E"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '4ad3c004-bc49-4d90-9c22-a4b3a198342d',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:19:10 GMT',
  'Content-Length',
  '334' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/synonymmaps(%27my-azure-synonymmap-3%27)')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'a32aa29b-43a6-4792-aa00-49c0b957ae48',
  'elapsed-time',
  '11',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:19:10 GMT' ]);

let nock = require('nock');

module.exports.hash = "2f40294de994b98bfecbb1b11fe55ad7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/synonymmaps(%27my-azure-synonymmap-3%27)', {"name":"my-azure-synonymmap-3","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA"})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#synonymmaps/$entity","@odata.etag":"\"0x8D96DD6843131FE\"","name":"my-azure-synonymmap-3","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA","encryptionKey":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D96DD6843131FE"',
  'Location',
  "https://endpoint/synonymmaps('my-azure-synonymmap-3')?api-version=2020-06-30-Preview",
  'request-id',
  'b7d64c3e-4dfe-4827-ac9f-a23db52ec3da',
  'elapsed-time',
  '23',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Thu, 02 Sep 2021 05:57:15 GMT',
  'Content-Length',
  '284'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7df8e9d3a79f1eecdfdbbdb7fbecf4f7fd885a2db3454e5f2faeb7b31faceb7cdbc1dabe475f9f57f52203624d55d6f4b77eddd0275f2d8b369fa5afdb8c901da5c19f69759e1e2ff2ba9866e96747e957af8f7fdfe577b3665e2c2fda6a394af1fb18df7cf79880e6cb697dbd6a8b6af97be5d71f3d5aaecbf297fc3febf313361c010000"], [
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
  'W/"0x8D96DD6843131FE"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'fb63c61a-03d7-4a65-b413-2b370eafa46d',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Thu, 02 Sep 2021 05:57:15 GMT',
  'Content-Length',
  '334'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/synonymmaps(%27my-azure-synonymmap-3%27)')
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  '5c9787a5-bddb-45c2-81bb-8944e4ebfc58',
  'elapsed-time',
  '10',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Thu, 02 Sep 2021 05:57:15 GMT'
]);

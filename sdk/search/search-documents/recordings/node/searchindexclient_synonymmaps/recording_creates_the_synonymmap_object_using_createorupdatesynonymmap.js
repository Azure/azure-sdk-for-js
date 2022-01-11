let nock = require('nock');

module.exports.hash = "6a8f4d752b331e0e30fd48d901a6ac23";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put(`/synonymmaps('my-azure-synonymmap-3')`, {"name":"my-azure-synonymmap-3","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA"})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#synonymmaps/$entity","@odata.etag":"\"0x8D9D237B7965604\"","name":"my-azure-synonymmap-3","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA","encryptionKey":null}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D9D237B7965604"',
  'Location',
  "https://endpoint/synonymmaps('my-azure-synonymmap-3')?api-version=2021-04-30-Preview",
  'request-id',
  '06bd1fe4-ad3e-4f31-81fe-370878e1a7d2',
  'elapsed-time',
  '29',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:44:59 GMT',
  'Content-Length',
  '284'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/synonymmaps('my-azure-synonymmap-3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7df874efde83270f1e7e7affd39dfddff7236ab5cc16397dbdb8dece7eb0aef36d076bfb1e7d7d5ed58b0c88355559d3dffa75439f7cb52cda7c96be6e33427694067fa6d5797abcc8eb629aa59f1da55fbd3efe7d97dfcd9a79b1bc68abe528c5ef637cf3dd63029a2fa7f5f5aa2daae5ef955f7ff468b92ecb5ff2ff0070ea15c01c010000"], [
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
  'W/"0x8D9D237B7965604"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'bcb09cc4-023f-47d8-b442-f3065b362a16',
  'elapsed-time',
  '10',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:44:59 GMT',
  'Content-Length',
  '335'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete(`/synonymmaps('my-azure-synonymmap-3')`)
  .query(true)
  .reply(204, "", [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'a4b03dd3-5f1a-4bd7-80ad-66b4a0c5b0a5',
  'elapsed-time',
  '16',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:44:59 GMT'
]);

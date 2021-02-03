let nock = require('nock');

module.exports.hash = "6591393158c9d7b4553b2557f52e590e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)/search.status')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff12f8a695d35d5793b3efec1bacec7afa5f14feeedecedfcfe3b9ffefef776c667cb59fe2eaf4fdfe5d3755b54cbb3e579f5d1e8a365b6c8a9d7c5f5768637b7093c9a6defd2774d9bb5eb86beadd7cb65b1bca08fcaac695fe5cdba245497ebb21c7d44ad05e0b78ba6adeaeb8f1e7deffbd4ae58142dbdfa8b3f5a64ef5ead976f0aeee6e59b9dd704853e7b5a4dd78b7cd99ebe6beb6c8af75f173fa0263bc1b727200bfd98676894d7cd9b4a5fa096bfe497fc3f2e6e44303f010000"], [
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
  'Vary',
  'Accept-Encoding',
  'request-id',
  'd717e07d-babe-4717-9c7a-30145faba076',
  'elapsed-time',
  '27',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:14:40 GMT',
  'Content-Length',
  '358'
]);

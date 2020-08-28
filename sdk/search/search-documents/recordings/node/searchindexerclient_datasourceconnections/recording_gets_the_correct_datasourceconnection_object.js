let nock = require('nock');

module.exports.hash = "d4eb1829f19c878a59729a885f0ca6d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27my-data-source-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a37777fb77cd916edf54723039b1a5d10e0dff7a39d77074f0ff61fde7fba737afaec74efdefeeffb11b55a668b9cbe5e5c6fa3f5b680d9dea56f667933ad8b555b54cb8f1e2dd76539faa8bd5ea1f1b46a1655339b50a3663d910fa5c1b4ce6740202b9b8f1efd626ab85ce6534078ddd6c592f040b35f42ed68c059b1cc6bb45214e6559bd36ba38f7ed13aafaf6d53a07532cf9617f9d3bc15602fabb2986a0b69f0342f737c33d0245f4eeb6b1ec9ef95eb87bfe4ff010dc335617d010000"], [ 'Cache-Control',
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
  'W/"0x8D8495D0EEFE234"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'e498f4f3-4f6a-4994-9c89-e5aab129b0ce',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:12:18 GMT',
  'Content-Length',
  '367' ]);

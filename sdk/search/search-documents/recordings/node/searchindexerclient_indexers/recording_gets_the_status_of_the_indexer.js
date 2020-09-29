let nock = require('nock');

module.exports.hash = "6591393158c9d7b4553b2557f52e590e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)/search.status')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff12f8a695d35d5793b3efec1bacec7afa5f14feeedecedfcfe3b9ffefef776c667cb59fe2eaf4fdfe5d3755b54cbb3e579f5d1e8a365b6c8a9d7c5f5768637b7093c9a6defd2774d9bb5eb86beadd7cb65b1bca08fcaac695fe5cdba24547fb16b502c5fd6d5459d370db5c9ebbaaabfa0dfb30b02bd5c972583aadb3705f705a4b6771e6eef7dfa66f7e0d1eebd473b0fc73b7b0f7e0aaf2e67d248de2ada7cd110e42901cb671f3ddad18f9e654569fe5e166d91956fea6cfa96507c4d18d9d7cf8be5c0378c2221febdef8f3ebaca6a0c4eff2292d6c594fe40c35f422d0dbdbe5d346d555f4babb258142d35fac51f2db277afd64b41faa397bb4f6910f4d1d36aba5ee4cbf6f45d4bdde3f5d7c50fa8c5eebdfdbddd070ff60e825627987cfa31cfd038af9b3795bef8d1a3fddd87fbf776f67fc92ff97f00dd711e752b020000"], [ 'Cache-Control',
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
  'dd50f97a-3819-4a96-9cc1-2bc9f0078466',
  'elapsed-time',
  '17',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:13:09 GMT',
  'Content-Length',
  '491' ]);

let nock = require('nock');

module.exports.hash = "2e9f16cfb2a26beb3e416a2ed8c8f9e9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test%27)/docs(%276%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147f3aacdcbb3d9478f3efaf4a391fcf5225be41f3d5aaecb72f4d12c6fa675b16a8b6a494d5eafeb555d34c5f2a2bc4ef377ab7cd91497f938fda29ae565daac8b366fd2797699a7d932ada679b6dcbe2cf2ab3141f6003dab0df469d6e617557d6dfe6eb38be6a347dffbfee8a35556bfa56ece96d3723dcb093d69d02c2a7c7c5c96d595fbb4cc9af655beac2e33807f4a40cd37357db2bc307f951575482dccdfd96c56e70df5287fd655b5a03fbef7fd5ff2ff00978a208417010000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=none',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '2cf25732-2093-477d-93ef-7e1d41f63641',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 10 Aug 2020 10:02:04 GMT',
  'Content-Length',
  '301' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes(%27hotel-live-test%27)/docs/search.index', {"value":[{"@search.action":"mergeOrUpload","hotelId":"6","hotelName":null,"description":"Modified Description","descriptionFr":null,"category":null,"tags":[],"parkingIncluded":null,"smokingAllowed":null,"lastRenovationDate":null,"rating":null,"location":null,"address":null,"rooms":[]}]})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1dbfcfaa3471f7dfad1e8a3a6cdda75f3d1a3b65ee7a38ff2baaeea2ff2a6c92ea8e1725d96a6c54935a34ff676767ec9f77fc9ff037255c7d34a000000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=none',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '8c33a960-ead4-441f-86ec-d407376b00b1',
  'elapsed-time',
  '25',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 10 Aug 2020 10:02:04 GMT',
  'Content-Length',
  '184' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test%27)/docs(%276%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147f3aacdcbb3d9478f3efaf4a391fcf5225be41f3d5aaecb72f4d12c6fa675b16a8b6a494dbea866c57991cfd2a7dec741a367b579739ab5f945555f9bbfdbeca2f9e8d1f7be3ffa6895d56f8be5c5d9725aae6739752d0d9a45858f8fcbb2ba729f9659d3beca97d56506f04f09a8f9a6a64f9617e6afb2a20ea985f93b9bcdeabca11ee5cfbaaa16f4c7f7beff4bfe1fcc8e7273f3000000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=none',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'b0bb3b58-b631-4ccc-acfb-3193957d0bf5',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 10 Aug 2020 10:02:06 GMT',
  'Content-Length',
  '264' ]);

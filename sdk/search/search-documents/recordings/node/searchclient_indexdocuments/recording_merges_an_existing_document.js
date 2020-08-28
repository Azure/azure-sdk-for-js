let nock = require('nock');

module.exports.hash = "9804832dc5bf4410c2d856a36a835b56";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes(%27hotel-live-test1%27)/docs/search.index', {"value":[{"@search.action":"merge","hotelId":"8","description":"Modified Description"}]})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1dbfcfaa3471f1d7c34faa869b376dd7cf4a8add7f9e8a3bcaeabfa8bbc69b20b6ab85c97a5697152cde893bd9d9d5ff2fd5ff2ff0038a311724a000000"], [ 'Cache-Control',
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
  'a08730f0-bfee-4db1-b815-8eaf8004cdcf',
  'elapsed-time',
  '23',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:09:06 GMT',
  'Content-Length',
  '184' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test1%27)/docs(%278%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147f3aacdcbb3d9478f3e3af868247fbdc816f9478f96ebb21c7d34cb9b695dacdaa25a52932faa59715ee4b3f4a9f771d0e8594dcdcecaf43acdd2d93a9dd4eba24d67795a66695daddb3ccddbb4c9d396feb8ccd3df77bdb393efa453fc3cdf6ff1237fa8cd9b360340fcb5aaca629a8fd3e77993365959d20ffa749215cb34bbcc8a7c892e9ab4ce2f1942d6e60bfa8c1b2daabac00b6342734a5f5c54f5b5195b9b5d341f3dfadef7471fadb2fa6db1bc385b4ecbf52c276248836651e1e3e3b2acaedca765d6b4aff26575c9f83d25a0e69b9a3e595e98bfca8a3aa416e6ef6c36abf3867a943febaa5ad01fdffbfe2ff97f0015ab79db85010000"], [ 'Cache-Control',
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
  'b5c2d090-c06c-433b-863e-ff98662d9259',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:09:08 GMT',
  'Content-Length',
  '364' ]);

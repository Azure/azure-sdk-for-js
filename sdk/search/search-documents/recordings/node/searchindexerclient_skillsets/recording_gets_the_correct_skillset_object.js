let nock = require('nock');

module.exports.hash = "c0952e7f05d9d888ecf1085f0c87f3cb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27my-azureblob-skillset-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8f376f8bb26cf2b6b9fbbbe5cbb668af3f1a19b0d4e48260febe1fedbc3b787a70efe9d3d367274fef9d3eddbffffb7e44ad96d922a7af17d7dbd90fd6753e29abc9b681b6bd4b0d667933ad8b555b544b6af75abf4afd8f471fc91b1f3dfa9e1d4d7bbd02dc1fffa298d655539db7637975fc86c6383e65245fe5d3ea625900067f4980149d1feff5bc5c97e5e82347a3bb4496f582064b0da7599b5f54759103838f5ee675436f8c3efa8975c6ddd0af5fd617d9b2f841c6b0461f7df5ea39fd7bbac80af4f9bc2200f2c55382f4a62014be8feecfb375d93ecf9617ebec223fa966c02c47b345b12c16ebc5cb3a9f160dde54f48ae5b45ccff23734f6326f1a1e256365be5ead5bfa8ba8a4e3e4c110f9aa753dc5df76547717797d91cf7e7f1e300f52da9ce06f7aa70bf1fbbf646481963ec6e645fadc01372decb7c3608910d5bad53f6d172ba67143efb719e1d9be301f57ab32ffc8c3a5f208df6b1e7ee9bd55ea8cf4de705ffc12464df9e7327f9dd797c5d491faedb2ba2af3d945febaad6a7a533ecd97d3fa9a19eaf7caafe5c35ff2ff00e4bcb26980030000"], [ 'Cache-Control',
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
  'W/"0x8D83DDEFCD3ED45"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '1471807e-76ac-4a0b-8a10-9054e1968b44',
  'elapsed-time',
  '53',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:12:11 GMT',
  'Content-Length',
  '581' ]);

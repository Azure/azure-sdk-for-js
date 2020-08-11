let nock = require('nock');

module.exports.hash = "2e6a34916f081d81a9c04a248096cd0f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde361f8d3ebaccca75fed1a3ef59d8d4e88200ffbe1fedbc3b787a70efe9e9a74fefed1f7c7afce9c1effb11b55f660b6afed1e27a3bfbc1bace276535d936f0b677a9c12c6fa675b16a8b6a49ed5eeb57a9fff1e82379c3efb6bd5e01ee8f7f514cebaaa9cedbb1bc3a7e43031d9f2edba2bd7e954fab8b650118fc250152747ebcd7f3725d96a38f1ca1eeceaae97a912f5b6a38cddafca2aa8b1c187cf432af1b7a63f4d14fac33ee867efdb2bec896c50f328635fae8ab57cfe9dfd34556a0cfe71501902f9e12a43705a1f07d747f9eadcbf679b6bc586717f949350366399a2d8a65b1582f5ed6f9b468f0a6a2572ca7e57a96bfa1b19779d3f028192bf3f56a4d93042ae938793044be6a5d4ff1b71dd5dd455e5fe4b3df9f07cc83943627f89bdee942fcfe2f1959a0a58fb179913e77c04d0bfbed30582244b56ef54fdbc58a690c7e6b33c2b37d613eae5665fe91874be511bed73cfcd27babd419e9bde1bef8258c9af2cf65fe3aaf2f8ba923f5db657555e6b38bfc755bd5f4a67c9a2fa7f53533d4ef955fcb87e85559362629f7ef3d79b07bef6649d9a30601bffe48527e242900f5f346523eddf9f4dec1939b25e51e3508f8f54792f2234901a89f3f92f2f4de83dda7374bca3e3508f8f54792f2234901a89f3792f2e0e0fec9935b785ff7a941c0af3f92941f490a40dd5a521c6b779aba2fbe319efffe2ff97f0091356efcf90f0000"], [ 'Cache-Control',
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
  '38af81a8-04db-4e16-bac8-0874dd8c8e33',
  'elapsed-time',
  '120',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:08:17 GMT',
  'Content-Length',
  '698' ]);

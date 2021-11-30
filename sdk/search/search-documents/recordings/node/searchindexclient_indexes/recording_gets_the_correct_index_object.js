let nock = require('nock');

module.exports.hash = "a01fab4c4678e48d6f5bd8c1d901514e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test3')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f9737777fb77cd916edf5472303971a5c10d0dff7a39d77074f1f1eecedef3f7b706fe7d3270feffdbe1f51ab65b6c8e9eb79d5e6e576595ce6dbe8f61e7d33cbcfb375d9be9e5675b1bc785957e745494d97ebb21c7d745ee4e5acf9e8d1f77eb18150cce89df67a85df4f678bf1eb16afd167827636c1cbe759d9e478bb6cf33af8a8cea97d7e299fb5f59a3e6aaaba95bfb5cd7936a5d1f89fbccdaf4d6b26c0f1322baf7f90d7064de9bbfb69d6f97b59d58bac2cbc4f9aeb65b5bc5e7c91ad30c6efff92911d66769537d5225fe64df33cbfcc4b1aa037e8a7d51ae81100ee38c0d51fb4a0bc71ccf2b73764f98047ac107f48439ee5cdb42e566d512d6964de68a3532c68fa83556c378e56db78c3d54f7e4ec6db6645d9d0b8bcb19e548b5599bf7b834f08cf1efb9394796f9c5465994f41b12dbc2c84ba43df0bb63242a1c1fff728e5d36a5ecc66f9f2bb7971316f69783a7c8cf96cd9dedba38fa4d700d39b86ac9ffdbf6accf451a008f9e3d147f459f3258b067da0afae2f2e4885e6357d8226a633fdd3f5a51fb4d5db7cd9fdfb1993483f21f2d5c107f9725a5f73afbf1708a0fd168ba2cc6a28ff47d6aae884fcf817c5b4ae9aeabc1d1fff605de7e3d74c97f1932ff6eebf76ef1141770db889fcf24b7ec9ff039ea52b10a2060000"], [
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
  'W/"0x8D98244F7306B93"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'efd7b653-16cf-41aa-a18c-751c2dde8810',
  'elapsed-time',
  '23',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:58:20 GMT',
  'Content-Length',
  '656'
]);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as lib from '../../../src/dtmiConventions'

import * as sinon from 'sinon'
import { assert, expect } from 'chai'

describe('dtmiConventions', function () {
  afterEach(() => {
    sinon.restore()
  })
  describe('isValidDtmi', function () {
    // TODO: Will implement more rigorous testing of DTMI validation over multiple different valid DTMIs.
    it('should validate a correctly formatted dtmi', function () {
      const validDtmi = 'dtmi:azure:DeviceManagement:DeviceInformation;1'
      const result = lib.isValidDtmi(validDtmi)
      assert(result, 'valid dtmi not found as valid')
    })

    // TODO: Will implement more rigorous testing of DTMI validation over multiple different invalid DTMIs.
    it('should invalidate an incorrectly formatted dtmi', function () {
      const invalidDtmi = 'dtmiazure:DeviceManagement:DeviceInformation;1'
      const result = lib.isValidDtmi(invalidDtmi)
      assert(!result, 'invalid dtmi incorrectly labelled as valid')
    })
  })

  describe('convertDtmiToPath', function () {
    it('should fail if the dtmi is not formatted correctly', function () {
      expect(() => {
        const invalidDtmi = 'dtmiazure:DeviceManagement:DeviceInformation;1'
        lib.convertDtmiToPath(invalidDtmi, false)
      }).to.throw('DTMI is incorrectly formatted. Ensure DTMI follows conventions.')
    })

    it('should reformat a DTMI to a generic path', function () {
      const validDtmi = 'dtmi:azure:DeviceManagement:DeviceInformation;1'
      const result = lib.convertDtmiToPath(validDtmi, false)
      assert.deepEqual(result, '/dtmi/azure/devicemanagement/deviceinformation-1.json')
    })
  })

  describe('getModelUri', function () {
    it('should fail if the dtmi is not formatted correctly', function () {
      expect(() => {
        const invalidDtmi = 'dtmiazure:DeviceManagement:DeviceInformation;1'
        const fakeBasePath = 'https://contoso.com'
        lib.getModelUri(invalidDtmi, fakeBasePath, false)
      }).to.throw('DTMI is incorrectly formatted. Ensure DTMI follows conventions.')
    })

    it('should reformat a DTMI to a qualified URL path', function () {
      const validDtmi = 'dtmi:foobar:DeviceInformation;1'
      const fakeBasePath = 'https://contoso.com'
      const result = lib.getModelUri(validDtmi, fakeBasePath, false)
      assert.deepEqual(result, 'https://contoso.com/dtmi/foobar/deviceinformation-1.json')
    })

    it('should add expanded to the path if specified', function () {
      const validDtmi = 'dtmi:foobar:DeviceInformation;1'
      const fakeBasePath = 'https://contoso.com'
      const result = lib.getModelUri(validDtmi, fakeBasePath, true)
      assert.deepEqual(result, 'https://contoso.com/dtmi/foobar/deviceinformation-1.expanded.json')
    })
  })
})

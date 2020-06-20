/* eslint-env jest */
import { BaseRegistryError } from '../BaseRegistryError'

describe('BaseRegistryError', () => {
  it('should create an instance', () => {
    const err = new BaseRegistryError(
      {
        code: 'TEST_ERR',
        statusCode: 300
      },
      {
        type: 'LOW_LEVEL_TYPE',
        statusCode: 400,
        subCode: 'SUB_CODE_ERR',
        message: 'This is a test error'
      }
    )

    err.withErrorId('err-id')

    expect(err.toJSON()).toEqual(
      expect.objectContaining({
        errId: 'err-id',
        code: 'TEST_ERR',
        subCode: 'SUB_CODE_ERR',
        statusCode: 400,
        message: 'This is a test error'
      })
    )

    expect(err.getErrorId()).toBe('err-id')
    expect(err.getErrorName()).toBe('BaseRegistryError')
    expect(err.getCode()).toBe('TEST_ERR')
    expect(err.getSubCode()).toBe('SUB_CODE_ERR')
    expect(err.getStatusCode()).toBe(400)
    expect(err.getErrorType()).toBe('LOW_LEVEL_TYPE')
    expect(err.stack).toBeDefined()
  })

  describe('error codes', () => {
    it('should use the default high level error code', () => {
      const err = new BaseRegistryError(
        {
          code: 'TEST_ERR',
          statusCode: 300
        },
        {
          message: 'This is a test error'
        }
      )

      expect(err.toJSON()).toEqual(
        expect.objectContaining({
          statusCode: 300
        })
      )

      expect(err.stack).toBeDefined()
    })

    it('should use the low level error code', () => {
      const err = new BaseRegistryError(
        {
          code: 'TEST_ERR'
        },
        {
          message: 'This is a test error',
          statusCode: 500
        }
      )

      expect(err.toJSON()).toEqual(
        expect.objectContaining({
          statusCode: 500
        })
      )

      expect(err.stack).toBeDefined()
    })
  })

  describe('log levels', () => {
    it('should use the default high level log level', () => {
      const err = new BaseRegistryError(
        {
          code: 'TEST_ERR',
          logLevel: 'debug'
        },
        {
          message: 'This is a test error'
        }
      )

      expect(err.getLogLevel()).toBe('debug')
    })

    it('should use the low level log level', () => {
      const err = new BaseRegistryError(
        {
          code: 'TEST_ERR',
          logLevel: 'debug'
        },
        {
          message: 'This is a test error',
          logLevel: 'trace'
        }
      )

      expect(err.getLogLevel()).toBe('trace')
    })

    it('should use the low level log level 2', () => {
      const err = new BaseRegistryError(
        {
          code: 'TEST_ERR'
        },
        {
          message: 'This is a test error',
          logLevel: 'trace'
        }
      )

      expect(err.getLogLevel()).toBe('trace')
    })
  })
})

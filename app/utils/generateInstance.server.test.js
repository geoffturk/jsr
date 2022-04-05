// import React from 'react'

import generateInstance from './generateInstance.server'

describe('generateInstance tests', () => {
  it('Schema with object should return nested object data', () => {
    let test_schema = {
      $schema: 'https://json-schema.org/draft-04/schema#',
      id: 'https://cdn.murmurations.network/schemas/test_schema-v1.json',
      title: 'Test Schema',
      description:
        'Just for testing - Select this schema to see your profile show up straight away on the Test map.',
      type: 'object',
      properties: {
        linked_schemas: {
          title: 'Linked Schemas',
          description:
            'The schemas against which the profile must be validated (must be alphanumeric with a dash(-) and/or underscore(_), e.g., demo_schema-v1',
          type: 'array',
          items: { type: 'string', pattern: '[A-Za-z0-9-._]{4,100}$' },
          minItems: 1,
          maxItems: 10,
          uniqueItems: true,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: { name: 'linked_schemas-v1', version: 1 },
            context: ['https://murmurations.network/fields/linked_schemas']
          }
        },
        name: {
          title: 'Entity Name',
          description: 'The name of the entity, organization, project, etc.',
          type: 'string',
          minLength: 1,
          maxLength: 100,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: { name: 'name-v1', version: 1 },
            context: ['https://schema.org/name']
          }
        },
        geolocation: {
          title: 'Geolocation Coordinates',
          description:
            'The geo-coordinates (latitude & longitude) of the primary location of the entity',
          type: 'object',
          properties: {
            lat: {
              title: 'Latitude',
              description: 'The latitude of the primary location of the entity',
              type: 'number',
              minimum: -90,
              maximum: 90,
              metadata: {
                creator: {
                  name: 'Murmurations Network',
                  url: 'https://murmurations.network'
                },
                field: { name: 'latitude', version: '0.0.1' },
                context: ['https://schema.org/latitude']
              }
            },
            lon: {
              title: 'Longitude',
              description:
                'The longitude of the primary location of the entity',
              type: 'number',
              minimum: -180,
              maximum: 180,
              metadata: {
                creator: {
                  name: 'Murmurations Network',
                  url: 'https://murmurations.network'
                },
                field: { name: 'longitude', version: '0.0.1' },
                context: ['https://schema.org/longitude']
              }
            }
          },
          required: ['lat', 'lon'],
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: { name: 'geolocation-v1', version: 1 },
            context: [
              'https://schema.org/latitude',
              'https://schema.org/longitude',
              'https://schema.org/GeoCoordinates'
            ]
          }
        }
      },
      required: ['linked_schemas', 'name', 'geolocation'],
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network/'
        },
        schema: {
          name: 'test_schema-v1',
          version: 1,
          purpose: 'A test schema to present profiles on the test map.',
          url: 'https://murmurations.network/schemas/test_schema'
        }
      }
    }
    let formData = {
      linked_schemas: 'test_schema-v1',
      name: 'The Dude',
      'geolocation.lat': '10',
      'geolocation.lon': '10'
    }
    let expected = {
      linked_schemas: ['test_schema-v1'],
      name: 'The Dude',
      geolocation: { lat: 10, lon: 10 }
    }
    let received = generateInstance(test_schema, formData)
    expect(received).toEqual(expected)
  })
})

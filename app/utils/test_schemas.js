export const schemaHeader = {
  $schema: 'https://json-schema.org/draft-07/schema#',
  $id: 'https://ic3.dev/test_schema.json',
  title: 'Test Schema',
  description: 'Just for testing',
  type: 'object'
}

const linked_schemas = {
  type: 'array',
  items: { type: 'string', pattern: '[A-Za-z0-9-._]{4,100}$' },
  minItems: 1,
  maxItems: 10,
  uniqueItems: true
}

const metadata = {
  schema: {
    name: 'test_schema'
  }
}

export const test_schema_1 = {
  ...schemaHeader,
  properties: {
    linked_schemas: linked_schemas,
    name: {
      title: 'Name',
      type: 'string'
    },
    geolocation: {
      type: 'object',
      properties: {
        lat: {
          title: 'Latitude',
          type: 'number'
        },
        lon: {
          title: 'Longitude',
          type: 'number'
        }
      },
      required: ['lat', 'lon']
    }
  },
  required: ['linked_schemas', 'name', 'geolocation'],
  metadata: metadata
}

export const test_schema_2 = {
  ...schemaHeader,
  properties: {
    linked_schemas: linked_schemas,
    name: {
      type: 'string'
    },
    urls: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          url: {
            type: 'string',
            pattern: '^https?://.*'
          }
        },
        required: ['name', 'url']
      }
    }
  },
  required: ['linked_schemas', 'name', 'urls'],
  metadata: metadata
}

export const test_schema_3 = {
  ...schemaHeader,
  properties: {
    linked_schemas: linked_schemas
  },
  required: ['linked_schemas'],
  metadata: metadata
}

export const test_schema_4 = {
  ...schemaHeader,
  properties: {
    linked_schemas: linked_schemas
  },
  required: ['linked_schemas'],
  metadata: metadata
}

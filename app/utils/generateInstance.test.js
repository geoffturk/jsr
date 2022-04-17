import generateInstance from './generateInstance'

import { test_schema_1, test_schema_2 } from './test_schemas'

describe('generateInstance tests', () => {
  it('Schema with object should return nested object data', () => {
    let formData = {
      linked_schemas: 'test_schema',
      name: 'The Dude',
      'geolocation-lat': '34.05',
      'geolocation-lon': '-118.24'
    }
    let expected = {
      linked_schemas: ['test_schema'],
      name: 'The Dude',
      geolocation: { lat: 34.05, lon: -118.24 }
    }
    let received = generateInstance(test_schema_1, formData)
    expect(received).toEqual(expected)
  })

  it('Schema with an array of objects should return nested array-object data', () => {
    let formData = {
      linked_schemas: 'test_schema',
      name: 'Big Tech',
      'urls-0-name': 'Google',
      'urls-0-url': 'https://google.com',
      'urls-1-name': 'Apple',
      'urls-1-url': 'https://apple.com',
      country: 'AF'
    }
    let expected = {
      linked_schemas: ['test_schema'],
      name: 'Big Tech',
      urls: [
        { name: 'Google', url: 'https://google.com' },
        { name: 'Apple', url: 'https://apple.com' }
      ],
      country: 'AF'
    }
    let received = generateInstance(test_schema_2, formData)
    expect(received).toEqual(expected)
  })

  it('Schema with array-object-object format should return nested array-object-object data (2.3.1)', () => {
    let test_schema = {
      $schema: 'https://json-schema.org/draft-07/schema#',
      $id: 'https://test-cdn.murmurations.network/schemas/test_schema-v2.3.1.json',
      title: 'Test Schema',
      description: 'Just for testing.',
      type: 'object',
      properties: {
        linked_schemas: {
          title: 'Linked Schemas',
          description:
            'The schemas against which the profile must be validated (must be alphanumeric with a dash(-) and/or underscore(_), e.g., demo_schema-v1',
          type: 'array',
          items: {
            type: 'string',
            pattern: '[A-Za-z0-9-._]{4,100}$'
          },
          minItems: 1,
          maxItems: 10,
          uniqueItems: true,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'linked_schemas-v1',
              version: 1
            },
            context: ['https://murmurations.network/fields/linked_schemas']
          }
        },
        aososn: {
          title: 'Arr->Obj->Str,Obj->Str,Num',
          description: 'Array of objects with a string and an object inside.',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              some_string: {
                title: 'String',
                description: 'A string.',
                type: 'string'
              },
              some_obj: {
                title: 'Object',
                description: 'An object.',
                type: 'object',
                properties: {
                  another_string: {
                    title: 'String2',
                    description: 'Another string.',
                    type: 'string'
                  },
                  some_number: {
                    title: 'Number',
                    description: 'A number.',
                    type: 'number'
                  }
                },
                required: ['another_string']
              }
            },
            required: ['some_string', 'some_obj']
          }
        }
      },
      required: ['linked_schemas'],
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network/'
        },
        schema: {
          name: 'test_schema-v2.3.1'
        }
      }
    }
    let formData = {
      linked_schemas: 'test_schema-v2.3.1',
      'aososn-0-some_string': 'string1',
      'aososn-0-some_obj-another_string': 'obj_string1',
      'aososn-0-some_obj-some_number': '200',
      'aososn-1-some_string': 'string2',
      'aososn-1-some_obj-another_string': 'obj_string2',
      'aososn-1-some_obj-some_number': '400'
    }
    let expected = {
      linked_schemas: ['test_schema-v2.3.1'],
      aososn: [
        {
          some_string: 'string1',
          some_obj: { another_string: 'obj_string1', some_number: 200 }
        },
        {
          some_string: 'string2',
          some_obj: { another_string: 'obj_string2', some_number: 400 }
        }
      ]
    }
    let received = generateInstance(test_schema, formData)
    expect(received).toEqual(expected)
  })

  it('Schema with object-object format should return nested object-object data (2.3.2)', () => {
    let test_schema = {
      $schema: 'https://json-schema.org/draft-07/schema#',
      $id: 'https://test-cdn.murmurations.network/schemas/test_schema-v2.3.2.json',
      title: 'Test Schema',
      description: 'Just for testing.',
      type: 'object',
      properties: {
        linked_schemas: {
          title: 'Linked Schemas',
          description:
            'The schemas against which the profile must be validated (must be alphanumeric with a dash(-) and/or underscore(_), e.g., demo_schema-v1',
          type: 'array',
          items: {
            type: 'string',
            pattern: '[A-Za-z0-9-._]{4,100}$'
          },
          minItems: 1,
          maxItems: 10,
          uniqueItems: true,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'linked_schemas-v1',
              version: 1
            },
            context: ['https://murmurations.network/fields/linked_schemas']
          }
        },
        ososn: {
          title: 'Obj->Str,Obj->Str,Num',
          description: 'An object with a string and an object inside.',
          type: 'object',
          properties: {
            some_string: {
              title: 'String',
              description: 'A string.',
              type: 'string'
            },
            some_obj: {
              title: 'Object',
              description: 'An object.',
              type: 'object',
              properties: {
                another_string: {
                  title: 'String2',
                  description: 'Another string.',
                  type: 'string'
                },
                some_number: {
                  title: 'Number',
                  description: 'A number.',
                  type: 'number'
                }
              },
              required: ['another_string']
            }
          },
          required: ['some_string', 'some_obj']
        }
      },
      required: ['linked_schemas'],
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network/'
        },
        schema: {
          name: 'test_schema-v2.3.2'
        }
      }
    }
    let formData = {
      linked_schemas: 'test_schema-v2.3.2',
      'ososn-some_string': 'Fruit',
      'ososn-some_obj-another_string': 'Apple',
      'ososn-some_obj-some_number': '300'
    }
    let expected = {
      linked_schemas: ['test_schema-v2.3.2'],
      ososn: {
        some_string: 'Fruit',
        some_obj: { another_string: 'Apple', some_number: 300 }
      }
    }
    let received = generateInstance(test_schema, formData)
    expect(received).toEqual(expected)
  })

  it('Schema with object-array-object format should return nested object-array-object data (2.3.3)', () => {
    let test_schema = {
      $schema: 'https://json-schema.org/draft-07/schema#',
      $id: 'https://test-cdn.murmurations.network/schemas/test_schema-v2.3.3.json',
      title: 'Test Schema',
      description: 'Just for testing.',
      type: 'object',
      properties: {
        linked_schemas: {
          title: 'Linked Schemas',
          description:
            'The schemas against which the profile must be validated (must be alphanumeric with a dash(-) and/or underscore(_), e.g., demo_schema-v1',
          type: 'array',
          items: {
            type: 'string',
            pattern: '[A-Za-z0-9-._]{4,100}$'
          },
          minItems: 1,
          maxItems: 10,
          uniqueItems: true,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'linked_schemas-v1',
              version: 1
            },
            context: ['https://murmurations.network/fields/linked_schemas']
          }
        },
        oaosn: {
          title: 'Obj->Arr->Obj->Str,Num',
          description:
            'An object with an array of objects with string and number.',
          type: 'object',
          properties: {
            some_arr: {
              title: 'Some Array',
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  some_string: {
                    title: 'String',
                    description: 'A string.',
                    type: 'string'
                  },
                  some_number: {
                    title: 'Number',
                    description: 'A number.',
                    type: 'number'
                  }
                },
                required: ['some_string']
              }
            }
          }
        }
      },
      required: ['linked_schemas'],
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network/'
        },
        schema: {
          name: 'test_schema-v2.3.3'
        }
      }
    }
    let formData = {
      linked_schemas: 'test_schema-v2.3.3',
      'oaosn-some_arr-0-some_string': 'Attitude',
      'oaosn-some_arr-0-some_number': '100',
      'oaosn-some_arr-1-some_string': 'Knowledge',
      'oaosn-some_arr-1-some_number': '96'
    }
    let expected = {
      linked_schemas: ['test_schema-v2.3.3'],
      oaosn: {
        some_arr: [
          { some_string: 'Attitude', some_number: 100 },
          { some_string: 'Knowledge', some_number: 96 }
        ]
      }
    }
    let received = generateInstance(test_schema, formData)
    expect(received).toEqual(expected)
  })

  it('Schema with object-object-object format should return nested object-object-object data (2.3.4)', () => {
    let test_schema = {
      $schema: 'https://json-schema.org/draft-07/schema#',
      $id: 'https://test-cdn.murmurations.network/schemas/test_schema-v2.3.4.json',
      title: 'Test Schema',
      description: 'Just for testing.',
      type: 'object',
      properties: {
        linked_schemas: {
          title: 'Linked Schemas',
          description:
            'The schemas against which the profile must be validated (must be alphanumeric with a dash(-) and/or underscore(_), e.g., demo_schema-v1',
          type: 'array',
          items: {
            type: 'string',
            pattern: '[A-Za-z0-9-._]{4,100}$'
          },
          minItems: 1,
          maxItems: 10,
          uniqueItems: true,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'linked_schemas-v1',
              version: 1
            },
            context: ['https://murmurations.network/fields/linked_schemas']
          }
        },
        osososn: {
          title: 'Obj->Str,Obj->Str,Obj->Str,Num',
          description:
            'An object with an object with a string and object with string and number.',
          type: 'object',
          properties: {
            a_string: {
              title: 'String',
              description: 'A string.',
              type: 'string'
            },
            obj2: {
              title: 'Obj2',
              type: 'object',
              properties: {
                b_string: {
                  title: 'String',
                  description: 'A string.',
                  type: 'string'
                },
                obj3: {
                  title: 'Some Object',
                  description: 'An object.',
                  type: 'object',
                  properties: {
                    c_string: {
                      title: 'String',
                      description: 'A string.',
                      type: 'string'
                    },
                    a_number: {
                      title: 'Number',
                      description: 'A number.',
                      type: 'number'
                    }
                  },
                  required: ['c_string']
                }
              },
              required: ['obj3']
            }
          }
        }
      },
      required: ['linked_schemas'],
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network/'
        },
        schema: {
          name: 'test_schema-v2.3.4'
        }
      }
    }
    let formData = {
      linked_schemas: 'test_schema-v2.3.4',
      'osososn-a_string': 'object1',
      'osososn-obj2-b_string': 'object2',
      'osososn-obj2-obj3-c_string': 'object3',
      'osososn-obj2-obj3-a_number': '200'
    }
    let expected = {
      linked_schemas: ['test_schema-v2.3.4'],
      osososn: {
        a_string: 'object1',
        obj2: {
          b_string: 'object2',
          obj3: { c_string: 'object3', a_number: 200 }
        }
      }
    }
    let received = generateInstance(test_schema, formData)
    expect(received).toEqual(expected)
  })

  it('Schema with array-object-array format should return nested array-object-array data (2.3.5)', () => {
    let test_schema = {
      $schema: 'https://json-schema.org/draft-07/schema#',
      $id: 'https://test-cdn.murmurations.network/schemas/test_schema-v2.3.5.json',
      title: 'Test Schema',
      description: 'Just for testing.',
      type: 'object',
      properties: {
        linked_schemas: {
          title: 'Linked Schemas',
          description:
            'The schemas against which the profile must be validated (must be alphanumeric with a dash(-) and/or underscore(_), e.g., demo_schema-v1',
          type: 'array',
          items: {
            type: 'string',
            pattern: '[A-Za-z0-9-._]{4,100}$'
          },
          minItems: 1,
          maxItems: 10,
          uniqueItems: true,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'linked_schemas-v1',
              version: 1
            },
            context: ['https://murmurations.network/fields/linked_schemas']
          }
        },
        aoas: {
          title: 'Arr->Obj->Arr->Str',
          description: 'An array with an object with an array of strings.',
          type: 'array',
          items: {
            title: 'An object',
            type: 'object',
            properties: {
              another_arr: {
                title: 'Another array',
                type: 'array',
                items: {
                  title: 'A string',
                  type: 'string'
                }
              }
            }
          }
        }
      },
      required: ['linked_schemas'],
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network/'
        },
        schema: {
          name: 'test_schema-v2.3.5'
        }
      }
    }
    let formData = {
      linked_schemas: 'test_schema-v2.3.5',
      'aoas-0-another_arr': 'string1',
      'aoas-1-another_arr': 'string2'
    }
    let expected = {
      linked_schemas: ['test_schema-v2.3.5'],
      aoas: [{ another_arr: ['string1'] }, { another_arr: ['string2'] }]
    }
    let received = generateInstance(test_schema, formData)
    expect(received).toEqual(expected)
  })
})

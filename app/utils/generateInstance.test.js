import generateInstance from './generateInstance'

import { test_schema_1 } from './test_schemas'

describe('generateInstance tests', () => {
  it('Schema with object should return nested object data', () => {
    let formData = {
      linked_schemas: 'test_schema-v1',
      name: 'The Dude',
      'geolocation-lat': '10',
      'geolocation-lon': '10'
    }
    let expected = {
      linked_schemas: ['test_schema-v1'],
      name: 'The Dude',
      geolocation: { lat: 10, lon: 10 }
    }
    let received = generateInstance(test_schema_1, formData)
    expect(received).toEqual(expected)
  })

  it('Schema with array-object should return nested array-object data', () => {
    let test_schema = {
      $schema: 'https://json-schema.org/draft-04/schema#',
      id: 'https://cdn.murmurations.network/schemas/murmurations_map-v1.json',
      title: 'Murmurations Map',
      description:
        'Regenerative economy orgs - Select this schema to show your profile on the Murmurations map.',
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
            field: {
              name: 'name-v1',
              version: 1
            },
            context: ['https://schema.org/name']
          }
        },
        urls: {
          title: 'Website Addresses/URLs',
          description: "URLs for the entity's website(s), social media, etc.",
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                title: 'URL Name',
                description:
                  'A name to make the URL recognizable (e.g., social media provider, demo site, etc.)',
                type: 'string',
                minLength: 1,
                maxLength: 100
              },
              url: {
                $ref: 'url-v1.json'
              }
            },
            required: ['name', 'url']
          },
          minItems: 1,
          maxItems: 50,
          uniqueItems: true,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'urls-v1',
              version: 1
            },
            context: ['https://schema.org/url']
          }
        },
        description: {
          title: 'Description',
          description:
            'A description of the item, entity, organization, project, etc.',
          type: 'string',
          minLength: 1,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'description-v1',
              version: 1
            },
            context: ['http://schema.org/description'],
            purpose:
              'The Description field can be used to provided a description of the item, entity, organization, project, etc. We have chosen not to add a maximum length but aggregators will snip the first ~160 characters of this field to provide a summary in directory listings or maps, so make sure the first sentence provides a good overview of the entity you are describing.'
          }
        },
        mission: {
          title: 'Mission Statement',
          description:
            'A short statement of why the entity exists, what its overall goal is: what kind of product or service it provides, its primary customers or market, and its geographical region of operation.',
          type: 'string',
          minLength: 1,
          maxLength: 1000,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'mission-v1',
              version: 1
            },
            context: ['https://en.wikipedia.org/wiki/Mission_statement']
          }
        },
        location: {
          title: 'Location Name',
          description: 'The map name of the primary location of the entity',
          type: 'object',
          properties: {
            country: {
              title: 'Country (2 letters)',
              description:
                'The two-letter country code according to the ISO 3166-1 standard',
              type: 'string',
              enum: [
                'AF',
                'AX',
                'AL',
                'DZ',
                'AS',
                'AD',
                'AO',
                'AI',
                'AQ',
                'AG',
                'AR',
                'AM',
                'AW',
                'AU',
                'AT',
                'AZ',
                'BS',
                'BH',
                'BD',
                'BB',
                'BY',
                'BE',
                'BZ',
                'BJ',
                'BM',
                'BT',
                'BO',
                'BQ',
                'BA',
                'BW',
                'BV',
                'BR',
                'IO',
                'BN',
                'BG',
                'BF',
                'BI',
                'KH',
                'CM',
                'CA',
                'CV',
                'KY',
                'CF',
                'TD',
                'CL',
                'CN',
                'CX',
                'CC',
                'CO',
                'KM',
                'CG',
                'CD',
                'CK',
                'CR',
                'CI',
                'HR',
                'CU',
                'CW',
                'CY',
                'CZ',
                'DK',
                'DJ',
                'DM',
                'DO',
                'EC',
                'EG',
                'SV',
                'GQ',
                'ER',
                'EE',
                'ET',
                'FK',
                'FO',
                'FJ',
                'FI',
                'FR',
                'GF',
                'PF',
                'TF',
                'GA',
                'GM',
                'GE',
                'DE',
                'GH',
                'GI',
                'GR',
                'GL',
                'GD',
                'GP',
                'GU',
                'GT',
                'GG',
                'GN',
                'GW',
                'GY',
                'HT',
                'HM',
                'VA',
                'HN',
                'HK',
                'HU',
                'IS',
                'IN',
                'ID',
                'IR',
                'IQ',
                'IE',
                'IM',
                'IL',
                'IT',
                'JM',
                'JP',
                'JE',
                'JO',
                'KZ',
                'KE',
                'KI',
                'KP',
                'KR',
                'KW',
                'KG',
                'LA',
                'LV',
                'LB',
                'LS',
                'LR',
                'LY',
                'LI',
                'LT',
                'LU',
                'MO',
                'MK',
                'MG',
                'MW',
                'MY',
                'MV',
                'ML',
                'MT',
                'MH',
                'MQ',
                'MR',
                'MU',
                'YT',
                'MX',
                'FM',
                'MD',
                'MC',
                'MN',
                'ME',
                'MS',
                'MA',
                'MZ',
                'MM',
                'NA',
                'NR',
                'NP',
                'NL',
                'NC',
                'NZ',
                'NI',
                'NE',
                'NG',
                'NU',
                'NF',
                'MP',
                'NO',
                'OM',
                'PK',
                'PW',
                'PS',
                'PA',
                'PG',
                'PY',
                'PE',
                'PH',
                'PN',
                'PL',
                'PT',
                'PR',
                'QA',
                'RE',
                'RO',
                'RU',
                'RW',
                'BL',
                'SH',
                'KN',
                'LC',
                'MF',
                'PM',
                'VC',
                'WS',
                'SM',
                'ST',
                'SA',
                'SN',
                'RS',
                'SC',
                'SL',
                'SG',
                'SX',
                'SK',
                'SI',
                'SB',
                'SO',
                'ZA',
                'GS',
                'SS',
                'ES',
                'LK',
                'SD',
                'SR',
                'SJ',
                'SZ',
                'SE',
                'CH',
                'SY',
                'TW',
                'TJ',
                'TZ',
                'TH',
                'TL',
                'TG',
                'TK',
                'TO',
                'TT',
                'TN',
                'TR',
                'TM',
                'TC',
                'TV',
                'UG',
                'UA',
                'AE',
                'GB',
                'US',
                'UM',
                'UY',
                'UZ',
                'VU',
                'VE',
                'VN',
                'VG',
                'VI',
                'WF',
                'EH',
                'YE',
                'ZM',
                'ZW'
              ]
            },
            locality: {
              title: 'Locality',
              description: 'A city, town, village, etc.',
              type: 'string',
              pattern: '^.{1,100}$'
            },
            region: {
              title: 'Region',
              description: 'A state, county, province, etc.',
              type: 'string',
              pattern: '^.{1,100}$'
            }
          },
          required: ['country'],
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'location-v1',
              version: 1
            },
            context: [
              'https://en.wikipedia.org/wiki/ISO_3166-1',
              'https://schema.org/addressLocality',
              'https://schema.org/addressRegion',
              'https://en.wikipedia.org/wiki/Location'
            ]
          }
        },
        geolocation: {
          title: 'Geolocation Coordinates',
          description:
            'The geo-coordinates (latitude & longitude) of the primary location of the entity',
          type: 'object',
          properties: {
            lat: {
              type: 'number',
              minimum: -90,
              maximum: 90
            },
            lon: {
              type: 'number',
              minimum: -180,
              maximum: 180
            }
          },
          required: ['lat', 'lon'],
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'geolocation-v1',
              version: 1
            },
            context: [
              'https://schema.org/latitude',
              'https://schema.org/longitude',
              'https://schema.org/GeoCoordinates'
            ]
          }
        },
        image: {
          title: 'Image',
          description: 'A URL for an image of the item or logo etc.',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                title: 'Image Name (alt tag)',
                description: 'Describe the image',
                type: 'string',
                minLength: 1,
                maxLength: 100
              },
              url: {
                $ref: 'url-v1.json'
              }
            },
            required: ['name', 'url']
          },
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'image-v1',
              version: 1
            },
            context: ['https://schema.org/image']
          }
        },
        rss: {
          title: 'RSS feed',
          description:
            'The URL for this entities RSS feed - usually somemthing like: yoursite.com/rss',
          type: 'string',
          maxLength: 100,
          pattern: 'https?://',
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'rss-v1',
              version: 1
            },
            context: ['https://en.wikipedia.org/wiki/RSS']
          }
        },
        org_type_tags: {
          title: 'Org Type - freeform tags',
          description:
            'What type of Organisation is this? e.g. Private limited company, School, Co-op, etc.',
          type: 'array',
          items: {
            type: 'string',
            minLength: 1,
            maxLength: 100
          },
          minItems: 1,
          maxItems: 50,
          uniqueItems: true,
          metadata: {
            creator: {
              name: 'Murmurations Network',
              url: 'https://murmurations.network'
            },
            field: {
              name: 'org_type_tags-v1',
              version: 1
            },
            context: ['https://schema.org/keywords']
          }
        }
      },
      required: ['linked_schemas', 'name', 'urls'],
      metadata: {
        creator: {
          name: 'Murmurations Network',
          url: 'https://murmurations.network/'
        },
        schema: {
          name: 'murmurations_map-v1',
          version: 1,
          purpose:
            'A map of organisations within the regenerative economy that have created Murmurations profiles.',
          url: 'https://murmurations.network/schemas/murmurations_map'
        }
      }
    }
    let formData = {
      linked_schemas: 'murmurations_map-v1',
      name: 'Big Tech',
      'urls-0-name': 'Google',
      'urls-0-url': 'https://google.com',
      'urls-1-name': 'Apple',
      'urls-1-url': 'https://apple.com',
      country: 'AF'
    }
    let expected = {
      linked_schemas: ['murmurations_map-v1'],
      name: 'Big Tech',
      urls: [
        { name: 'Google', url: 'https://google.com' },
        { name: 'Apple', url: 'https://apple.com' }
      ],
      country: 'AF'
    }
    let received = generateInstance(test_schema, formData)
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

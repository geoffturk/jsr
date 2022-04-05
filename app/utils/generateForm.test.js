import React from 'react'

import FormField from '../components/FormField'
import generateForm from './generateForm'

describe('generateForm tests', () => {
  it('Schema with no properties should return null', () => {
    let test_schema = {
      $schema: 'https://json-schema.org/draft-07/schema#',
      $id: 'https://ic3.dev/test_schema.json',
      title: 'Test Schema',
      description: 'Just for testing',
      type: 'object'
    }

    expect(generateForm(test_schema)).toBe(null)
  })

  it('Schema with properties should return expected form fields', () => {
    let test_schema = {
      $schema: 'https://json-schema.org/draft-07/schema#',
      $id: 'https://ic3.dev/test_schema.json',
      title: 'Test Schema',
      description: 'Just for testing',
      type: 'object',
      properties: {
        name: {
          title: 'Your Name',
          type: 'string',
          minLength: 2,
          maxLength: 5
        },
        email: {
          title: 'Email',
          type: 'string'
        }
      },
      required: ['name', 'email']
    }

    let received = generateForm(test_schema)
    let expected = [
      <FormField
        maxlength={5}
        minlength={2}
        name="name"
        title="Your Name"
        type="string"
      />,
      <FormField name="email" title="Email" type="string" />
    ]
    expect(received.toString()).toEqual(expected.toString())
  })
})

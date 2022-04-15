import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import generateForm from './generateForm'

let schemaHeader = {
  $schema: 'https://json-schema.org/draft-07/schema#',
  $id: 'https://ic3.dev/test_schema.json',
  title: 'Test Schema',
  description: 'Just for testing',
  type: 'object'
}

describe('generateForm tests', () => {
  it('Schema with no properties should return null', () => {
    expect(generateForm(schemaHeader)).toBe(null)
  })
})

describe('render form tests', () => {
  it('Should render string and number input fields', () => {
    let test_schema = {
      ...schemaHeader,
      properties: {
        name: {
          title: 'Your Name',
          type: 'string',
          minLength: 2,
          maxLength: 5
        },
        age: {
          title: 'Age',
          type: 'number'
        }
      },
      required: ['name', 'age']
    }
    render(generateForm(test_schema))

    expect(screen.getByLabelText('Your Name:')).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /name/i, type: /string/i })
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Age:')).toBeInTheDocument()
    expect(
      screen.getByRole('spinbutton', { name: /age/i, type: /number/i })
    ).toBeInTheDocument()
  })
})

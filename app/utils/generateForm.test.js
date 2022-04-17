import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import generateForm from './generateForm'
import { schemaHeader, test_schema_1 } from './test_schemas'

describe('generateForm tests', () => {
  it('Schema with no properties should return null', () => {
    expect(generateForm(schemaHeader)).toBe(null)
  })
})

describe('render form tests', () => {
  it('Should render string and number input fields', () => {
    render(generateForm(test_schema_1))

    expect(
      screen.getByRole('textbox', { name: /name/i, type: /string/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('spinbutton', {
        name: /geolocation-lat/i,
        type: /number/i
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('spinbutton', {
        name: /geolocation-lon/i,
        type: /number/i
      })
    ).toBeInTheDocument()
  })
})

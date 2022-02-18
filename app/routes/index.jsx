import { Form, json, useLoaderData } from 'remix'
import Ajv from 'ajv'

import parseRef from '~/utils/parseRef.server'
import generateInstance from '~/utils/generateInstance.server'
import generateForm from '~/utils/generateForm'

export async function action({ request }) {
  let formData = await request.formData()
  let data = Object.fromEntries(formData)
  let schema = await parseRef('https://ic3.dev/test_schema.json')
  // because ajv does not handle https protocol - https://github.com/ajv-validator/ajv/issues/1104
  delete schema['$schema']
  let profile = generateInstance(schema, data)
  let ajv = new Ajv({ allErrors: true })
  let validate = ajv.compile(schema)
  let valid = validate(profile)
  if (!valid) {
    return json(validate.errors, { status: 400 })
  }
  return json(profile, { status: 200 })
}

export async function loader() {
  return await parseRef('https://ic3.dev/test_schema.json')
}

export default function Index() {
  let schema = useLoaderData()
  return (
    <div>
      <h1>JSON Schema - Remix</h1>
      <Form method="post">
        {generateForm(schema)}
        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}

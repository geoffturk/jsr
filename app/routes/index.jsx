import { Form, json, useLoaderData } from 'remix'

import fetchPost from '~/utils/fetchPost'
import generateForm from '~/utils/generateForm'
import generateInstance from '~/utils/generateInstance.server'
import parseRef from '~/utils/parseRef.server'

let selectedSchema = 'test_schema-v3.0.0'
// let schemaUrl = `https://test-cdn.murmurations.network/schemas/${selectedSchema}.json`
let schemaUrl = `https://ic3.dev/test_schema.json`

export async function action({ request }) {
  let formData = await request.formData()
  let data = {}
  for (let key in formData._fields) {
    formData._fields[key].length > 1
      ? (data[key] = formData._fields[key])
      : (data[key] = formData._fields[key][0])
  }
  let schema = await parseRef(schemaUrl)
  let profile = generateInstance(schema, data)
  profile.linked_schemas = [selectedSchema]
  let validation = await fetchPost(
    'https://test-index.murmurations.network/v2/validate',
    profile
  )
  let body = await validation.json()
  if (validation.status === 400) {
    return json(body, { status: 400 })
  } else if (validation.status === 200) {
    if (body.status === 400) {
      return json(body.failure_reasons, { status: 400 })
    }
    return json(profile, { status: 200 })
  } else {
    console.error('Some other validation response error')
  }
}

export async function loader() {
  return await parseRef(schemaUrl)
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

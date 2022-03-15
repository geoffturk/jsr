import { Form, json, useLoaderData } from 'remix'

import fetchPost from '~/utils/fetchPost'
import generateForm from '~/utils/generateForm'
import generateInstance from '~/utils/generateInstance.server'
import parseRef from '~/utils/parseRef.server'

export async function action({ request }) {
  let formData = await request.formData()
  let data = Object.fromEntries(formData)
  let schema = await parseRef(
    'https://test-cdn.murmurations.network/schemas/test_schema-v2.0.0.json'
  )
  let profile = generateInstance(schema, data)
  profile.linked_schemas = ['test_schema-v2.0.0']
  let validation = await fetchPost(
    'https://test-index.murmurations.network/v2/validate',
    profile
  )
  if (validation.status === 400) {
    let body = await validation.json()
    return json(body, { status: 400 })
  } else if (validation.status === 200) {
    return json(profile, { status: 200 })
  } else {
    console.error('Some other validation response error')
  }
}

export async function loader() {
  return await parseRef(
    'https://test-cdn.murmurations.network/schemas/test_schema-v2.0.0.json'
  )
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

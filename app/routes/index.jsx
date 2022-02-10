import { Form, json, useLoaderData } from 'remix'
import Ajv from 'ajv'
import parseRef from '~/utils/parseRef.server'

export async function action({ request }) {
  let formData = await request.formData()
  let data = Object.fromEntries(formData)
  console.log(data)
  let schema = await parseRef('https://ic3.dev/test_schema.json')
  let profile = {}

  Object.keys(data)
    .filter(name => data[name] !== '')
    .map(
      name =>
        (profile[name] =
          schema.properties[name].type === 'number'
            ? parseInt(data[name])
            : data[name])
    )

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
        {Object.keys(schema.properties).map(name => (
          <span key={name}>
            <label>
              <span className="key">{schema.properties[name].title}:</span>
              <input
                type={
                  schema.properties[name].type === 'number' ? 'number' : 'text'
                }
                name={name}
              />
            </label>
            <br />
          </span>
        ))}
        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}

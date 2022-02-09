import { Form, json } from 'remix'
import Ajv from 'ajv'

let schema = {
  type: 'object',
  properties: {
    name: {
      title: 'Your Name',
      type: 'string'
    },
    email: {
      title: 'Email',
      type: 'string'
    },
    age: {
      title: 'Age (in dog years)',
      type: 'number'
    }
  },
  required: ['name', 'email']
}

export async function action({ request }) {
  let formData = await request.formData()
  let profile = {}
  Object.keys(formData._fields)
    .filter(name => formData._fields[name][0] !== '')
    .map(
      name =>
        (profile[name] =
          schema.properties[name].type === 'number'
            ? parseInt(formData._fields[name][0])
            : formData._fields[name][0])
    )

  let ajv = new Ajv({ allErrors: true })
  let validate = ajv.compile(schema)
  let valid = validate(profile)
  if (!valid) {
    return json(validate.errors, { status: 400 })
  }
  return json(profile, { status: 200 })
}

export default function Index() {
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

# Using JSON Schema with Remix

This is a prototyping repo to try out JSON Schema in Remix.

## Issues to Note

- Cloudflare Workers do not allow `eval` or `new Function()` so validation and parsing tools like `ajv` won't run in a worker. 

## To Do

- [x] Define the scope of the JSON Schema functionality to support
- [ ] Pull in schemas from Murm Library
  - [x] Add ref parser
- [x] Pass profile to Murm Index for validation (since `eval` is not an option for CF workers) instead of `ajv`
- [ ] Build form display and formData parsing logic for defined JSON Schema functionality

### JSON Schema Functionality Scope

```
properties
  title
  description
  type
required

Types
-----
✔string
  ✔minLength
  ✔maxLength
  pattern
  ✔enum
    ✔enumNames
✔number
  ✔minimum
  ✔maximum
array
  items
    string (multiple choice)
    enum
      enumNames
      contexts
    uniqueItems (boolean)

object
boolean
null
```

#### Form inputs generation - [`generateForm.js`](app/utils/generateForm.js)

_Given a JSON schema, generate form inputs for the properties defined in the schema._

#### JSON instance generation - [`generateInstance.server.js`](app/utils/generateInstance.server.js)

_Given a JSON schema and form data, generate a JSON instance representing the data collected in the form._

#### JSON instance validation - `POST https://test-index.murmurations.network/v2/validate`

_Given at least one JSON schema and a JSON instance, validated the JSON instance to the schema(s)._

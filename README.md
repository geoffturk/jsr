# Using JSON Schema with Remix

This is a prototyping repo to try out JSON Schema in Remix.

## Issues to Note

- Cloudflare Workers do not allow `eval` or `new Function()` so validation and parsing tools like `ajv` won't run in a worker. 

## To Do

- [x] Define the scope of the JSON Schema functionality to support
- [x] Pull in schemas from Murm Library
  - [x] Add ref parser
- [x] Pass profile to Murm Index for validation (since `eval` is not an option for CF workers) instead of `ajv`
- [x] Build form display and formData parsing logic for defined JSON Schema functionality
- [x] Add error boundary
- [x] Label nesting objects
- [ ] Add multiselect for schemas and merge
- [ ] Add more tests

## JSON Schema Functionality Scope

### _Form inputs generation_ - [`generateForm.js`](app/utils/generateForm.js)

Given a JSON schema, generate form inputs for the properties defined in the schema.

### _JSON instance generation_ - [`generateInstance.js`](app/utils/generateInstance.js)

Given a JSON schema and form data, generate a JSON instance representing the data collected in the form.

### _JSON instance validation_ - `POST https://test-index.murmurations.network/v2/validate`

Given at least one JSON schema and a JSON instance, validated the JSON instance to the schema(s).

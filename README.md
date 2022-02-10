# Using JSON Schema with Remix

This is a prototyping repo to try out JSON Schema in Remix.

## Issues to Note

- Cloudflare Workers do not allow `eval` or `new Function()` so validation and parsing tools like `ajv` won't run in a worker. 

## To Do

- [ ] Define the scope of the JSON Schema functionality to support
- [ ] Pull in schemas from Murm Library
  - [x] Add ref parser
- [ ] Pass profiles to Murm Index for validation (since `eval` is not an option for CF workers) instead of `ajv`
- [ ] Build form display and formData parsing logic for defined JSON Schema functionality

### JSON Schema Functionality Scope

#### Form data generation

_Given a JSON schema, generate form inputs for the properties defined in the schema._

#### JSON instance generation

_Given a JSON schema and form data, generate a JSON instance representing the data collected in the form._

#### JSON instance validation

_Given a JSON schema and a JSON instance, validated the JSON instance to that schema._

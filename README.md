# Using JSON Schema with Remix

This is a prototyping repo to try out JSON Schema in Remix.

## Issues to Note

- Cloudflare Workers do not allow `eval` or `new Function()` so validation and parsing tools like `ajv` won't run in a worker. 

## To Do

- [ ] Decide what JSON Schema functionality to support
- [ ] Pull in schemas from Murm Library
- [ ] Pass profiles to Murm Index for validation (since `eval` is not an option for CF workers) instead of `ajv`
- [ ] Build form display and formData parsing logic for defined JSON Schema functionality

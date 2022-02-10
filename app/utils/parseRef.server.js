import refParser from '@apidevtools/json-schema-ref-parser'

export default async function parseRef(url) {
  return await refParser.dereference(url)
}

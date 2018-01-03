import { GraphQLScalarType, GraphQLError } from 'graphql'
import { Kind } from 'graphql/language'

function identity(value) {
  return value
}

function parseLiteral(ast) {
  switch (ast.kind) {
    case Kind.OBJECT: {
      throw new GraphQLError('Objects are not a valid coordinates')
    }
    case Kind.STRING: {
      throw new GraphQLError('Strings are not a valid coordinates')
    }
    case Kind.INT:
    case Kind.FLOAT: {
      return parseFloat(ast.value)
    }
    case Kind.LIST: {
      return ast.values.map(parseLiteral)
    }
    default:
      return null
  }
}

export default new GraphQLScalarType({
  name: 'JSON',
  description: 'a type for geospatial coordinates',
  serialize: identity,
  parseValue: identity,
  parseLiteral,
})

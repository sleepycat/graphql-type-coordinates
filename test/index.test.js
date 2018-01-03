import { graphql, GraphQLObjectType, GraphQLSchema } from 'graphql'
import GraphQLJSON from '../src'

const FIXTURE = [
  [-76.102294921875, 45.27875187893957],
  [-75, 45],
  [-75.38818359375, 45.57560020947802],
  [-76.102294921875, 45.57560020947802],
  [-76.102294921875, 45.27875187893957],
]

describe('Coordinates', () => {
  let schema

  beforeEach(() => {
    schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          value: {
            type: GraphQLJSON,
            args: {
              arg: {
                type: GraphQLJSON,
              },
            },
            resolve: (obj, { arg }) => arg,
          },
        },
      }),
    })
  })

  describe('serialize', () => {
    it('should support serialization', () => {
      expect(GraphQLJSON.serialize(FIXTURE)).toEqual(FIXTURE)
    })
  })

  describe('parseValue', () => {
    it('should support parsing values', async () => {
      const response = await graphql(
        schema,
        'query ($arg: JSON) { value(arg: $arg) }',
        null,
        null,
        { arg: FIXTURE },
      )

      const { data } = response
      expect(data.value).toEqual(FIXTURE)
    })
  })

  describe('parseLiteral', () => {
    it('should support parsing literals', async () => {
      const response = await graphql(
        schema,
        `
          {
            value(
              arg: [
                [-76.102294921875, 45.27875187893957]
                [-75, 45]
                [-75.38818359375, 45.57560020947802]
                [-76.102294921875, 45.57560020947802]
                [-76.102294921875, 45.27875187893957]
              ]
            )
          }
        `,
      )
      const { data } = response
      expect(data.value).toEqual([
        [-76.102294921875, 45.27875187893957],
        [-75, 45],
        [-75.38818359375, 45.57560020947802],
        [-76.102294921875, 45.57560020947802],
        [-76.102294921875, 45.27875187893957],
      ])
    })
  })
})

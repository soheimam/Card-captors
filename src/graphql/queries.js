/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCard = /* GraphQL */ `
  query GetCard($id: ID!) {
    getCard(id: $id) {
      id
      name
      description
      power
      createdAt
      updatedAt
    }
  }
`;
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        power
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

const CATEGORY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          reviews {
            data {
              id
              attributes {
                title
                body
                rating
                categories {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function Category() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <div>
      <h2>{data.category.data.attributes.name}</h2>
      {data.category.data.attributes.reviews.data.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>
          {review.attributes.categories.data.map((category) => (
            <small key={category.id}>{category.attributes.name}</small>
          ))}
          <p>{review.attributes.body.substring(0, 200)}...</p>
          <Link to={`/reviews/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}

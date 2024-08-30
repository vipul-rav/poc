import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Table } from "reactstrap";

export const GET_POSTS = `
  query GetPostList {
    posts {
      id
      author {
        id
        name
        age
      }
      body
    }
  }
`;

const rowStyles = (post, canEdit) =>
  canEdit(post) ? { cursor: "pointer", fontWeight: "bold" } : {};

const PostViewer = ({ canEdit, onEdit }) => {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const result = await fetch("http://localhost:4000/graphtest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        operationName: "GetPostList",
        query: GET_POSTS,
        variables: {},
      }),
    });
    const response = await result.json();
    setData(response.data);
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.posts.map((post) => (
            <tr
              key={post.id}
              style={rowStyles(post, canEdit)}
              onClick={() => canEdit(post) && onEdit(post)}
            >
              <td>{post.author.name}</td>
              <td>{post.body}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const PostViewer1 = ({ canEdit, onEdit }) => (
  <Query query={GET_POSTS}>
    {({ loading, data }) =>
      !loading && (
        <Table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.posts.map((post) => (
                <tr
                  key={post.id}
                  style={rowStyles(post, canEdit)}
                  onClick={() => canEdit(post) && onEdit(post)}
                >
                  <td>{post.author.name}</td>
                  <td>{post.body}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )
    }
  </Query>
);

PostViewer.defaultProps = {
  canEdit: () => false,
  onEdit: () => null,
};

export default PostViewer;

import React, { useEffect, useState } from "react";
import axios from "axios";

const LoadMoreButton = () => {
  const [posts, setPosts] = useState([]); // posts will be of type array
  let [blogsToDisplay, setBlogsToDisplay] = useState(posts.slice(0, 3)); // initially we will show 3 blogs

  const loadMoreBlogs = () => {
    // this function will load some more blogs
    let currLoadedBlogs = [...blogsToDisplay]; // spread all the current displayed blogs
    if (currLoadedBlogs.length < posts.length) {
      // check condition if we displayed all the blogs or not
      currLoadedBlogs = posts.slice(0, currLoadedBlogs.length + 3); // update the array with some more blogs
      setBlogsToDisplay(currLoadedBlogs); // set the value of setBlogsToDisplay to the updated array
    } else {
      console.log("no more blogs left to display"); // you can use your own logic here in order to reach the last blog
    }
  };
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // run only on the first render

  let blogCards = blogsToDisplay.map((blog) => {
    // blogCards will store the card data
    return (
      <div
        key={blog.id}
        style={{ fontSize: "5px", border: "2px solid red", margin: "3px" }}>
        <h3>{blog.id}</h3>
        <h1>{blog.title}</h1>
        <h3>{blog.body}</h3>
      </div>
    );
  });

  return (
    <div>
      {blogCards}
      <button onClick={() => loadMoreBlogs()}>Load More</button>
    </div>
  );
};

export default LoadMoreButton;

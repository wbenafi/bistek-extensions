const GetRestaurants = () => {
  const body = fetch("https://jsonplaceholder.typicode.com/posts/1").then(
    (res) => res.json()
  );

  return body;
};

console.log(GetRestaurants())
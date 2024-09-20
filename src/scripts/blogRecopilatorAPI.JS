const url = "http://localhost:4000/api/blogs/all-blogs"; 

export default async function getBlogs() {
    fetch(url)
      .then((response) => {
        if(response.ok){
           
            return response.json();
        }

        return Promise.reject("URL invalida")
      }).catch((error) => console.log(error));      
};

console.log(getBlogs().value)
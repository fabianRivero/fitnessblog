import Blog from "./classes/blog.js";

let blogList = [];


function createBlog(id, title, publicationDate, tags, cardImage, content){
    let newBlog  = new Blog(id, title, publicationDate, tags, cardImage, content);
}


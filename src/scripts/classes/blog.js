export default class Blog {
    #id;
    #title;
    #publicationDate;
    #tags;
    #cardImage;
    #content;
    constructor(id, title, publicationDate, tags, cardImage, content){
        this.#id = id;
        this.#title = title;
        this.#publicationDate = publicationDate;
        this.#tags = tags;
        this.#cardImage = cardImage;
        this.#content = content;
    }
    editBlog(){

    }
    EraseBlog(){

    }
}
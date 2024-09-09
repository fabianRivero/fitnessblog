export default class Blog {
    #id;
    #publicationDate;
    constructor(id, title, publicationDate, tags, cardImage, content){
        this.#id = id;
        this.title = title;
        this.#publicationDate = publicationDate;
        this.tags = tags;
        this.cardImage = cardImage;
        this.content = content;
    }
    editBlog(){

    }
    EraseBlog(){

    }
}
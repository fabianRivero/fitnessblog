export function blogRecopilator(){
    let blogList = [];
    let blogKeys = [];
        if (localStorage.length > 0) {
            try {
                localStorage.removeItem("astroErrorOverlayTheme");    
            } catch (error) {}
            
            for (const key in localStorage) {
                blogKeys.push(key);
            };
            
            blogKeys.splice(blogKeys.length - 6, 6);
            
            for(const key of blogKeys){
                let blog = JSON.parse(localStorage.getItem(key));
                blogList.push(blog);
            };
            
            const orderedBlogList = blogList.sort((a, b) => a.extendedDate > b.extendedDate).reverse();
            return orderedBlogList;
        } 
    };   
    
export default function blogRecopilator(){
    
    if (localStorage.length > 0) {
        try {
            localStorage.removeItem("astroErrorOverlayTheme");    
        } catch (error) {
            
        }
        
        let blogList = [];
        let blogKeys = [];
        
        for (const key in localStorage) {
            blogKeys.push(key);
        };
        
        blogKeys.splice(blogKeys.length - 6, 6);
        
        for(const key of blogKeys){
            let blog = JSON.parse(localStorage.getItem(key));
            blogList.push(blog);
        };
        console.log(blogList);
    }    
}



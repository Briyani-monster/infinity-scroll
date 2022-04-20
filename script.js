const imageContainer=document.getElementById('image-container')
const loader=document.getElementById('loader')
let ready=false
let imagesLoaded=0;
let totalImage=0;
let photosArray=[];
// unsplash api
let count=5;
const apiKey='VU56xYUhJ_jXiZFWQGcghNXbZ18B75YShnzMfS64h04';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// update url function
function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}
// check if all image were loaded
function imageLoaded(){
    imagesLoaded++
    if(imagesLoaded===totalImage){
        ready=true;
        loader.hidden=true;
        
    }
}
// Helper Function to set Attributes
function setAttributes(elements,attributes){
    for(const key in attributes){
        elements.setAttribute(key,attributes[key])
    }
}

function displayPhotos(){
    totalImage=photosArray.length
    imagesLoaded=0
    // Run Function for each object in photosArray
    photosArray.forEach((photo)=>{
        
        //  Create <a> to link unspsplash
        const item=document.createElement('A');
        
        setAttributes(item,{href:photo.links.html,
                            target:'_blank'});
        // create <img> for photo
        const img=document.createElement('IMG')
        
        setAttributes(img,{src:photo.urls.regular,
                            alt:photo.alt_description,
                            title:photo.alt_description});
            // event listener
            img.addEventListener('load',imageLoaded)
        // put <img> inside <a> then put both  inside ImageContainer Element
        item.appendChild(img)
        
        imageContainer.appendChild(item);
    })
}
// get Photos from unsplash api 
async function getPhotos(){
    try {
        const response=await fetch(apiUrl);
        photosArray=await response.json();
        displayPhotos();
        if (isInitialLoad) { 
            updateAPIURLWithNewCount(30) 
            isInitialLoad = false 
        }
    }catch(error){
        // cath error
    }
}
// check to see if scrolling near bottom of page load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false
        getPhotos();
        
    }
})

// on Load
getPhotos();
/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */ 


function getStar(value){
    let yellowStar = '<i class="fa fa-star"></i>'
    console.log(value);
    // value.target = yellowStar;
    // console.log(value.target);
    document.getElementById("display-star").innerHTML = yellowStar;
    // console.log(value.target);

}


function Star(el, count, callback) {
    
    // <i class="fa fa-star"></i>
    let star = document.querySelector(el);
    let allStar = ''
    for(let i=0;i<count;i++){
        allStar += '<i class="fa fa-star-o"></i>'
        
    }
    star.innerHTML = allStar;

    document.addEventListener('click',callback);
}


Star("#star", 5, getStar);

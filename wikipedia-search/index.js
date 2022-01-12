const searchTermEl = document.querySelector('#searchTerm')
const searchResultEl = document.querySelector('#searchResult');

searchTermEl.focus()


searchTermEl.addEventListener('input',(event)=>{
    search(event.target.value);
})


let timeoutId;


const search = (searchTerm) => {
    if (timeoutId) {
        clearTimeout(timeoutId)
    }

    if (!searchTerm) {
        searchResultEl.innerHTML = '';
        return;
    }
    timeoutId = setTimeout(async ()=> {
    try {
        const url=`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchTerm}`
        const response = await fetch(url);
        const searchResults = await response.json();
        const searchResultHtml = generateHTML(searchResults.query.search,searchTerm);

        searchResultEl.innerHTML = searchResultHtml;
    
        console.log({
            'term': searchTerm,
            'results': searchResults.query.search
        })
        
    } catch (error) {
        console.log(error);
    }
},500);
}

const stripHtml = (html) => {
    let div = document.createElement('div');
    div.textContent = html;
    return div.textContent;
}


const highlight = (str,keyword,className = "highlight") => {
    const h1 = `<span class="${className}">${keyword}</span>`;
    return str.replace(new RegExp(keyword, 'gi'),h1);
}

const generateHTML = (results, searchTerm) => {
    return results.map(result=> {
        const title = highlight(stripHtml(result.title),searchTerm);
        const snippet = highlight(stripHtml(result.snippet),searchTerm);



        return `<article>

            <a href="https://en.wikipedia.org/?curid=${result.pageid}">
                <h2>${title}</h2>
        
            </a>
            <div class="summary">${snippet}...</div>
        </article>`
    })
}
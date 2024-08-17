const API_KEY="b7fabe97e04f4a8cbf7723d906caad4d";
const URL="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> fetchNews("India"));

async function fetchNews(query){
    
  const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
  const data= await response.json();
  bindData(data.articles);  
}

function bindData(articles){
const cardContainer=document.querySelector(".card-container");
const newsCardTemplete=document.querySelector("#card-templete");

cardContainer.innerHTML=""
articles.forEach(article => {
    if(!article.urlToImage) return;
    const cardClone=newsCardTemplete.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardContainer.appendChild(cardClone);
});
}
function fillDataInCard(cardClone, article){
         const newsImg=cardClone.querySelector("#news-img")
         const newsTitle=cardClone.querySelector("#news-title");
         const newsSource=cardClone.querySelector("#news-source");
         const newsDocs=cardClone.querySelector("#news-docs");

         newsImg.src=article.urlToImage;
         newsTitle.innerHTML=article.title;
         newsDocs.innerHTML=article.description;
         
         const date= new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/jakarta"
         });
         newsSource.innerHTML=`${article.source.name} -${date}`;

         cardClone.firstElementChild.addEventListener('click', ()=>{
            window.open(article.url , "_blank");
         })
}
 let curSelectedNav=null;
 function onNavItemclick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
 }
 let button=document.querySelector("#button-item");
 let text=document.querySelector("#text-item");
 button.addEventListener("click", ()=>{
    const query=text.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav.classList.remove('active');
    curSelectedNav=null;
 })
 function reload(){
    window.location.reload();
 }

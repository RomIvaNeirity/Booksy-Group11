var _=Object.defineProperty;var L=t=>{throw TypeError(t)};var $=(t,e,o)=>e in t?_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var w=(t,e,o)=>$(t,typeof e!="symbol"?e+"":e,o),S=(t,e,o)=>e.has(t)||L("Cannot "+o);var p=(t,e,o)=>e.has(t)?L("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o);var r=(t,e,o)=>(S(t,e,"access private method"),o);import{S as A,N as T}from"./assets/vendor-Dv3Tt4MS.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();var c,h;class m{static async fetchCategories(){return r(this,c,h).call(this,"/category-list","Error fetching categories")}static async fetchTopBooks(){return r(this,c,h).call(this,"/top-books","Error fetching top books")}static async fetchBooksByCategory(e){return r(this,c,h).call(this,`/category?category=${encodeURIComponent(e)}`,"Error fetching books by category")}static async fetchBookById(e){return r(this,c,h).call(this,`/${e}`,"Error fetching book by ID")}}c=new WeakSet,h=async function(e,o){try{const i=await fetch(`${this.BASE_URL}${e}`);if(console.log(`[FETCH] ${this.BASE_URL}${e}`),!i.ok)throw new Error(`${o}: ${i.status}`);return await i.json()}catch(i){throw console.error(o,i),i}},p(m,c),w(m,"BASE_URL","https://books-backend.p.goit.global/books");var a,C,b,k;class g{static renderCategories(e,o,i){const s=[{list_name:"All categories"},...e];this._categories=s,this._onCategoryClick=i,this._container=o,r(this,a,b).call(this),window.addEventListener("resize",r(this,a,C).bind(this))}static renderBooks(e,o){if(!(e!=null&&e.length)){o.innerHTML='<li class="no-books-message">No books found</li>';return}o.innerHTML=e.map(i=>r(this,a,k).call(this,i)).join("")}static renderMoreBooks(e,o){o.insertAdjacentHTML("beforeend",e.map(i=>r(this,a,k).call(this,i)).join(""))}static updateCounters(e,o,i,n){i.textContent=e,n.textContent=o}static toggleShowMoreButton(e,o){e.classList.toggle("hidden",!o)}static truncateText(e,o){return(e==null?void 0:e.length)>o?e.substring(0,o)+"…":e}}a=new WeakSet,C=function(){window.innerWidth<1440!==this._isMobile&&r(this,a,b).call(this)},b=function(){this._isMobile=window.innerWidth<1440;const e=this._container,o=this._categories,i=this._onCategoryClick;this._isMobile?(e.innerHTML=`
    <div class="dropdown-wrapper">
      <select id="category-select" class="category-select">
        <option value="" disabled selected hidden>Categories</option>
        ${o.map(s=>`
            <option value="${s.list_name}">
              ${s.list_name}
            </option>`).join("")}
      </select>
    </div>
  `,e.querySelector("#category-select").addEventListener("change",s=>{i(s.target.value)})):(e.innerHTML=o.map(n=>`
          <div 
            class="filter-item ${n.list_name==="All categories"?"active":""}"
            data-category="${n.list_name}"
            role="button"
            tabindex="0"
          >
            ${n.list_name}
          </div>
        `).join(""),e.querySelectorAll(".filter-item").forEach(n=>{n.addEventListener("click",()=>{e.querySelectorAll(".filter-item").forEach(s=>s.classList.remove("active")),n.classList.add("active"),i(n.dataset.category)})}))},k=function(e){return`
      <li class="book-item">
        <div class="book-image">
          ${e.book_image?`<img src="${e.book_image}" 
              alt="${e.title} by ${e.author||"Unknown Author"}" 
              loading="lazy" 
              onerror="this.src='img/no-image.png';">`:'<div class="no-image">No image available</div>'}
        </div>
        <div class="book-details">
          <h3 class="book-title">${this.truncateText(e.title,50)}</h3>
          <p class="book-author">${e.author||"Unknown Author"}</p>
          <p class="book-price">${"$"+e.price}</p>
          <button class="learn-more-btn" data-id="${e._id}">Learn More</button>
        </div>
      </li>
    `},p(g,a);let v="";const I=window.innerWidth>=768?24:10;let l=[],d=0;const f=document.getElementById("books-list"),q=document.getElementById("filters-list"),E=document.getElementById("show-more-btn"),H=document.getElementById("showing-count"),N=document.getElementById("total-count");document.addEventListener("DOMContentLoaded",P);function P(){O(),E.addEventListener("click",j),f.addEventListener("click",onBookClick)}function O(){const t=[{list_name:"Combined Print and E-Book Fiction"},{list_name:"Combined Print and E-Book Nonfiction"},{list_name:"Hardcover Fiction"},{list_name:"Paperback Trade Fiction"},{list_name:"Paperback Nonfiction"},{list_name:"Advice How-To and Miscellaneous"},{list_name:"Childrens Middle Grade Hardcover"}];g.renderCategories(t,q,B),B("All categories")}function B(t){v=t==="All categories"?"":t,U()}async function U(){try{y("loading","Loading books...");let t=v?await m.fetchBooksByCategory(v):(await m.fetchTopBooks()).flatMap(e=>e.books||[]);if(!(t!=null&&t.length))return y("no-books","No books found");l=t,d=Math.min(I,l.length),g.renderBooks(l.slice(0,d),f),M()}catch(t){console.error("❌ Failed to load books:",t),y("error","Could not load books.")}}function j(){const t=Math.min(d+4,l.length),e=l.slice(d,t);e.length&&(g.renderMoreBooks(e,f),d=t,M())}function M(){g.updateCounters(d,l.length,H,N),g.toggleShowMoreButton(E,d<l.length)}function y(t,e){f.innerHTML=`<li class="${t}-message">${e}</li>`}new A(".hero-swiper",{modules:[T],speed:600,loop:!1,keyboard:{enabled:!0,onlyInViewport:!0},slidesPerView:1,spaceBetween:20,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});function F(){const t=document.body,e=document.querySelector(".mobile-menu"),o=document.querySelector(".mob-menu-btn"),i=document.querySelector(".mob-menu-close-btn");o.addEventListener("click",()=>{e.classList.add("is-open"),t.classList.add("menu-open")}),i.addEventListener("click",()=>{e.classList.remove("is-open"),t.classList.remove("menu-open")}),e.querySelectorAll("a").forEach(n=>{n.addEventListener("click",()=>{e.classList.remove("is-open"),t.classList.remove("menu-open")})}),document.querySelectorAll('a[href^="#"]').forEach(n=>{n.addEventListener("click",s=>{const u=document.querySelector(n.getAttribute("href"));u&&(s.preventDefault(),u.scrollIntoView({behavior:"smooth",block:"start"}),e.classList.remove("is-open"),t.classList.remove("menu-open"))})})}F();
//# sourceMappingURL=index.js.map

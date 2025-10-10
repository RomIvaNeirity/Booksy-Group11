var M=Object.defineProperty;var B=t=>{throw TypeError(t)};var $=(t,e,o)=>e in t?M(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var C=(t,e,o)=>$(t,typeof e!="symbol"?e+"":e,o),A=(t,e,o)=>e.has(t)||B("Cannot "+o);var p=(t,e,o)=>e.has(t)?B("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o);var r=(t,e,o)=>(A(t,e,"access private method"),o);import{S,N as T}from"./assets/vendor-Dv3Tt4MS.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&n(m)}).observe(document,{childList:!0,subtree:!0});function o(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=o(i);fetch(i.href,s)}})();var c,g;class h{static async fetchCategories(){return r(this,c,g).call(this,"/category-list","Error fetching categories")}static async fetchTopBooks(){return r(this,c,g).call(this,"/top-books","Error fetching top books")}static async fetchBooksByCategory(e){return r(this,c,g).call(this,`/category?category=${encodeURIComponent(e)}`,"Error fetching books by category")}static async fetchBookById(e){return r(this,c,g).call(this,`/${e}`,"Error fetching book by ID")}}c=new WeakSet,g=async function(e,o){try{const n=await fetch(`${this.BASE_URL}${e}`);if(console.log(`[FETCH] ${this.BASE_URL}${e}`),!n.ok)throw new Error(`${o}: ${n.status}`);return await n.json()}catch(n){throw console.error(o,n),n}},p(h,c),C(h,"BASE_URL","https://books-backend.p.goit.global/books");var a,_,b,k;class u{static renderCategories(e,o,n){const s=[{list_name:"All categories"},...e];this._categories=s,this._onCategoryClick=n,this._container=o,r(this,a,b).call(this),window.addEventListener("resize",r(this,a,_).bind(this))}static renderBooks(e,o){if(!(e!=null&&e.length)){o.innerHTML='<li class="no-books-message">No books found</li>';return}o.innerHTML=e.map(n=>r(this,a,k).call(this,n)).join("")}static renderMoreBooks(e,o){o.insertAdjacentHTML("beforeend",e.map(n=>r(this,a,k).call(this,n)).join(""))}static updateCounters(e,o,n,i){n.textContent=e,i.textContent=o}static toggleShowMoreButton(e,o){e.classList.toggle("hidden",!o)}static truncateText(e,o){return(e==null?void 0:e.length)>o?e.substring(0,o)+"…":e}}a=new WeakSet,_=function(){window.innerWidth<1440!==this._isMobile&&r(this,a,b).call(this)},b=function(){this._isMobile=window.innerWidth<1440;const e=this._container,o=this._categories,n=this._onCategoryClick;this._isMobile?(e.innerHTML=`
    <div class="dropdown-wrapper">
      <select id="category-select" class="category-select">
        <option value="" disabled selected hidden>Categories</option>
        ${o.map(s=>`
            <option value="${s.list_name}">
              ${s.list_name}
            </option>`).join("")}
      </select>
    </div>
  `,e.querySelector("#category-select").addEventListener("change",s=>{n(s.target.value)})):(e.innerHTML=o.map(i=>`
          <div 
            class="filter-item ${i.list_name==="All categories"?"active":""}"
            data-category="${i.list_name}"
            role="button"
            tabindex="0"
          >
            ${i.list_name}
          </div>
        `).join(""),e.querySelectorAll(".filter-item").forEach(i=>{i.addEventListener("click",()=>{e.querySelectorAll(".filter-item").forEach(s=>s.classList.remove("active")),i.classList.add("active"),n(i.dataset.category)})}))},k=function(e){return`
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
    `},p(u,a);let w="";const H=window.innerWidth>=768?24:10;let l=[],d=0;const f=document.getElementById("books-list"),I=document.getElementById("filters-list"),E=document.getElementById("show-more-btn"),N=document.getElementById("showing-count"),P=document.getElementById("total-count");document.addEventListener("DOMContentLoaded",O);function O(){U(),E.addEventListener("click",F),f.addEventListener("click",onBookClick)}function U(){const t=[{list_name:"Combined Print and E-Book Fiction"},{list_name:"Combined Print and E-Book Nonfiction"},{list_name:"Hardcover Fiction"},{list_name:"Paperback Trade Fiction"},{list_name:"Paperback Nonfiction"},{list_name:"Advice How-To and Miscellaneous"},{list_name:"Childrens Middle Grade Hardcover"}];u.renderCategories(t,I,v),v("All categories")}function v(t){w=t==="All categories"?"":t,j()}async function j(){try{y("loading","Loading books...");let t=w?await h.fetchBooksByCategory(w):(await h.fetchTopBooks()).flatMap(e=>e.books||[]);if(!(t!=null&&t.length))return y("no-books","No books found");l=t,d=Math.min(H,l.length),u.renderBooks(l.slice(0,d),f),L()}catch(t){console.error("❌ Failed to load books:",t),y("error","Could not load books.")}}function F(){const t=Math.min(d+4,l.length),e=l.slice(d,t);e.length&&(u.renderMoreBooks(e,f),d=t,L())}function L(){u.updateCounters(d,l.length,N,P),u.toggleShowMoreButton(E,d<l.length)}function y(t,e){f.innerHTML=`<li class="${t}-message">${e}</li>`}new S(".hero-swiper",{modules:[T],speed:600,loop:!1,keyboard:{enabled:!0,onlyInViewport:!0},slidesPerView:1,spaceBetween:20,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});
//# sourceMappingURL=index.js.map

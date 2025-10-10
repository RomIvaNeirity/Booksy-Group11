var $=Object.defineProperty;var B=t=>{throw TypeError(t)};var S=(t,e,o)=>e in t?$(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var v=(t,e,o)=>S(t,typeof e!="symbol"?e+"":e,o),A=(t,e,o)=>e.has(t)||B("Cannot "+o);var p=(t,e,o)=>e.has(t)?B("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o);var r=(t,e,o)=>(A(t,e,"access private method"),o);import{S as T,N as H}from"./assets/vendor-Dv3Tt4MS.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&s(m)}).observe(document,{childList:!0,subtree:!0});function o(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=o(i);fetch(i.href,n)}})();var c,g;class h{static async fetchCategories(){return r(this,c,g).call(this,"/category-list","Error fetching categories")}static async fetchTopBooks(){return r(this,c,g).call(this,"/top-books","Error fetching top books")}static async fetchBooksByCategory(e){return r(this,c,g).call(this,`/category?category=${encodeURIComponent(e)}`,"Error fetching books by category")}static async fetchBookById(e){return r(this,c,g).call(this,`/${e}`,"Error fetching book by ID")}}c=new WeakSet,g=async function(e,o){try{const s=await fetch(`${this.BASE_URL}${e}`);if(console.log(`[FETCH] ${this.BASE_URL}${e}`),!s.ok)throw new Error(`${o}: ${s.status}`);return await s.json()}catch(s){throw console.error(o,s),s}},p(h,c),v(h,"BASE_URL","https://books-backend.p.goit.global/books");var a,E,y,w;class u{static renderCategories(e,o,s){const n=[{list_name:"All categories"},...e];this._categories=n,this._onCategoryClick=s,this._container=o,r(this,a,y).call(this),window.addEventListener("resize",r(this,a,E).bind(this))}static renderBooks(e,o){if(!(e!=null&&e.length)){o.innerHTML='<li class="no-books-message">No books found</li>';return}o.innerHTML=e.map(s=>r(this,a,w).call(this,s)).join("")}static renderMoreBooks(e,o){o.insertAdjacentHTML("beforeend",e.map(s=>r(this,a,w).call(this,s)).join(""))}static updateCounters(e,o,s,i){s.textContent=e,i.textContent=o}static toggleShowMoreButton(e,o){e.classList.toggle("hidden",!o)}static truncateText(e,o){return(e==null?void 0:e.length)>o?e.substring(0,o)+"…":e}}a=new WeakSet,E=function(){window.innerWidth<1440!==this._isMobile&&r(this,a,y).call(this)},y=function(){this._isMobile=window.innerWidth<1440;const e=this._container,o=this._categories,s=this._onCategoryClick;this._isMobile?(e.innerHTML=`
    <div class="dropdown-wrapper">
      <select id="category-select" class="category-select">
        <option value="" disabled selected hidden>Categories</option>
        ${o.map(n=>`
            <option value="${n.list_name}">
              ${n.list_name}
            </option>`).join("")}
      </select>
    </div>
  `,e.querySelector("#category-select").addEventListener("change",n=>{s(n.target.value)})):(e.innerHTML=o.map(i=>`
          <div 
            class="filter-item ${i.list_name==="All categories"?"active":""}"
            data-category="${i.list_name}"
            role="button"
            tabindex="0"
          >
            ${i.list_name}
          </div>
        `).join(""),e.querySelectorAll(".filter-item").forEach(i=>{i.addEventListener("click",()=>{e.querySelectorAll(".filter-item").forEach(n=>n.classList.remove("active")),i.classList.add("active"),s(i.dataset.category)})}))},w=function(e){return`
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
    `},p(u,a);let k="";const N=window.innerWidth>=768?24:10;let l=[],d=0;const f=document.getElementById("books-list"),P=document.getElementById("filters-list"),_=document.getElementById("show-more-btn"),I=document.getElementById("showing-count"),O=document.getElementById("total-count");document.addEventListener("DOMContentLoaded",U);function U(){j(),_.addEventListener("click",F),f.addEventListener("click",onBookClick)}function j(){const t=[{list_name:"Combined Print and E-Book Fiction"},{list_name:"Combined Print and E-Book Nonfiction"},{list_name:"Hardcover Fiction"},{list_name:"Paperback Trade Fiction"},{list_name:"Paperback Nonfiction"},{list_name:"Advice How-To and Miscellaneous"},{list_name:"Childrens Middle Grade Hardcover"}];u.renderCategories(t,P,C),C("All categories")}function C(t){k=t==="All categories"?"":t,q()}async function q(){try{b("loading","Loading books...");let t=k?await h.fetchBooksByCategory(k):(await h.fetchTopBooks()).flatMap(e=>e.books||[]);if(!(t!=null&&t.length))return b("no-books","No books found");l=t,d=Math.min(N,l.length),u.renderBooks(l.slice(0,d),f),M()}catch(t){console.error("❌ Failed to load books:",t),b("error","Could not load books.")}}function F(){const t=Math.min(d+4,l.length),e=l.slice(d,t);e.length&&(u.renderMoreBooks(e,f),d=t,M())}function M(){u.updateCounters(d,l.length,I,O),u.toggleShowMoreButton(_,d<l.length)}function b(t,e){f.innerHTML=`<li class="${t}-message">${e}</li>`}new T(".hero-swiper",{modules:[H],speed:600,slidesPerView:1,spaceBetween:20,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},on:{init(){L(this)},slideChange(){L(this)}}});function L(t){const e=document.querySelector(".swiper-button-prev"),o=document.querySelector(".swiper-button-next");t.isBeginning?e.classList.add("swiper-button-disabled"):e.classList.remove("swiper-button-disabled"),t.isEnd?o.classList.add("swiper-button-disabled"):o.classList.remove("swiper-button-disabled")}
//# sourceMappingURL=index.js.map

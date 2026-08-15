const IMAGES=[
"https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=84",
"https://images.unsplash.com/photo-1619020985209-852c1de42d42?auto=format&fit=crop&w=900&q=84",
"https://images.unsplash.com/photo-1599253366255-57649c2cd60e?auto=format&fit=crop&w=900&q=84",
"https://images.unsplash.com/photo-1605270985275-06b0cf93c744?auto=format&fit=crop&w=900&q=84",
"https://images.unsplash.com/photo-1536548665027-b96d34a005ae?auto=format&fit=crop&w=900&q=84",
"https://images.unsplash.com/photo-1599418175586-9355fef5c483?auto=format&fit=crop&w=900&q=84",
"https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=84",
"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=84"
];
const products=[
{id:1,n:"Midnight Cotton Shirt",cat:"shirts",price:1999,c:"black",size:["S","M","L","XL"],tag:"NEW",desc:"Pure cotton · relaxed fit",img:0},
{id:2,n:"Ivory Oxford Shirt",cat:"shirts",price:2299,c:"white",size:["S","M","L","XL","XXL"],tag:"BESTSELLER",desc:"Premium cotton · formal",img:1},
{id:3,n:"Royal Navy Linen Shirt",cat:"shirts",price:2499,c:"navy",size:["M","L","XL"],tag:"NEW",desc:"Pure linen · breathable",img:2},
{id:4,n:"Burgundy Statement Shirt",cat:"shirts",price:2399,c:"burgundy",size:["S","M","L","XL"],tag:"TRENDING",desc:"Rich tone · evening edit",img:3},
{id:5,n:"Black Satin Evening Shirt",cat:"shirts",price:2799,c:"black",size:["M","L","XL"],tag:"EVENING",desc:"Satin finish · tailored",img:4},
{id:6,n:"Royal Print Cotton Shirt",cat:"shirts",price:2199,c:"navy",size:["S","M","L","XL"],tag:"SIGNATURE",desc:"Printed cotton · smart casual",img:5},
{id:7,n:"Classic Gold-Accent Shirt",cat:"shirts",price:2599,c:"gold",size:["M","L","XL"],tag:"ROYAL EDIT",desc:"Subtle gold detail",img:6},
{id:8,n:"Black Linen Resort Shirt",cat:"shirts",price:2499,c:"black",size:["S","M","L","XL","XXL"],tag:"NEW",desc:"Linen · relaxed silhouette",img:7},
{id:9,n:"Deep Navy Formal Shirt",cat:"shirts",price:1899,c:"navy",size:["S","M","L","XL"],tag:"ESSENTIAL",desc:"Sharp collar · everyday formal",img:1},
{id:10,n:"Ivory Festive Shirt",cat:"shirts",price:2699,c:"white",size:["M","L","XL","XXL"],tag:"FESTIVE",desc:"Occasion-ready cotton",img:6},
{id:11,n:"Regent Black Blazer",cat:"blazers",price:7999,c:"black",size:["M","L","XL"],tag:"SIGNATURE",desc:"Tailored evening blazer",img:4},
{id:12,n:"Royal Navy Blazer",cat:"blazers",price:8499,c:"navy",size:["M","L","XL"],tag:"NEW",desc:"Structured royal tailoring",img:2},
{id:13,n:"Burgundy Velvet Blazer",cat:"blazers",price:9999,c:"burgundy",size:["M","L","XL"],tag:"LIMITED",desc:"Velvet · evening occasion",img:3},
{id:14,n:"Gold-Trim Waistcoat",cat:"blazers",price:5499,c:"gold",size:["S","M","L","XL"],tag:"FESTIVE",desc:"Statement waistcoat",img:6},
{id:15,n:"Charcoal Executive Suit",cat:"suits",price:11999,c:"black",size:["M","L","XL"],tag:"BESTSELLER",desc:"Two-piece formal suit",img:0},
{id:16,n:"Midnight Royal Suit",cat:"suits",price:13999,c:"navy",size:["M","L","XL"],tag:"ROYAL EDIT",desc:"Deep navy occasion suit",img:2},
{id:17,n:"Black Gold Occasion Suit",cat:"suits",price:14999,c:"gold",size:["M","L","XL"],tag:"LIMITED",desc:"Black tailoring · gold detail",img:4},
{id:18,n:"Tailored Black Trousers",cat:"trousers",price:2799,c:"black",size:["S","M","L","XL","XXL"],tag:"ESSENTIAL",desc:"Clean formal trouser",img:7},
{id:19,n:"Royal Navy Trousers",cat:"trousers",price:2999,c:"navy",size:["M","L","XL"],tag:"NEW",desc:"Modern tapered fit",img:1},
{id:20,n:"Regal Ivory Kurta Set",cat:"ethnic",price:4499,c:"white",size:["M","L","XL","XXL"],tag:"FESTIVE",desc:"Festive kurta ensemble",img:6},
{id:21,n:"Midnight Sherwani Edit",cat:"ethnic",price:12999,c:"black",size:["M","L","XL"],tag:"ROYAL EDIT",desc:"Wedding-ready statement",img:4},
{id:22,n:"Burgundy Nehru Jacket",cat:"ethnic",price:4999,c:"burgundy",size:["S","M","L","XL"],tag:"NEW",desc:"Festive layered look",img:3},
{id:23,n:"Signature Gold Watch",cat:"accessories",price:4999,c:"gold",size:["M","L","XL"],tag:"SIGNATURE",desc:"Gold-tone finishing piece",img:6},
{id:24,n:"V Signature Cufflinks",cat:"accessories",price:1499,c:"gold",size:["S","M","L","XL","XXL"],tag:"ACCESSORY",desc:"Elegant finishing detail",img:5}
];

let active="all", search="", min=0,max=Infinity, selectedColors=[], selectedSize=null;
let cart=JSON.parse(localStorage.getItem("vastralaya-cart")||"[]");
let wishlist=JSON.parse(localStorage.getItem("vastralaya-wishlist")||"[]");

const money=n=>"₹"+n.toLocaleString("en-IN");
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

function filtered(){
  let list=products.filter(p=>
    (active==="all"||p.cat===active) &&
    p.price>=min && p.price<=max &&
    (!selectedColors.length||selectedColors.includes(p.c)) &&
    (!selectedSize||p.size.includes(selectedSize)) &&
    (!search||`${p.n} ${p.cat} ${p.desc} ${p.tag}`.toLowerCase().includes(search.toLowerCase()))
  );
  const s=document.getElementById("sortSelect").value;
  if(s==="low") list.sort((a,b)=>a.price-b.price);
  if(s==="high") list.sort((a,b)=>b.price-a.price);
  if(s==="az") list.sort((a,b)=>a.n.localeCompare(b.n));
  if(s==="za") list.sort((a,b)=>b.n.localeCompare(a.n));
  if(s==="new") list.sort((a,b)=>b.id-a.id);
  if(s==="best") list.sort((a,b)=>(b.tag==="BESTSELLER")-(a.tag==="BESTSELLER"));
  return list;
}

function render(){
  const list=filtered();
  document.getElementById("resultCount").textContent=list.length+" styles";
  document.getElementById("products").innerHTML=list.map(p=>`
    <article class="product">
      <div class="product-image">
        <img loading="lazy" src="${IMAGES[p.img]}" alt="${esc(p.n)}">
        <span class="badge">${p.tag}</span>
        <button class="wish ${wishlist.includes(p.id)?"active":""}" onclick="toggleWish(${p.id})" aria-label="Wishlist">${wishlist.includes(p.id)?"♥":"♡"}</button>
        <button class="quick-btn" onclick="quickView(${p.id})">QUICK VIEW</button>
      </div>
      <div class="product-info">
        <div class="product-brand">VASTRALAYA MEN'S WEAR</div>
        <div class="product-name">${esc(p.n)}</div>
        <div class="product-meta"><span>${esc(p.desc)}</span><span class="price">${money(p.price)}</span></div>
        <div class="product-actions"><button class="add" onclick="addToCart(${p.id})">ADD TO BAG</button></div>
      </div>
    </article>`).join("");
  document.getElementById("wishCount").textContent=wishlist.length;
}

function setFilter(f){
  active=f;
  document.querySelectorAll(".filter-toggle").forEach(b=>b.classList.toggle("active",b.dataset.filter===f));
  document.getElementById("collection").scrollIntoView({behavior:"smooth",block:"start"});
  render();
}
function addToCart(id){
  const p=products.find(x=>x.id===id), found=cart.find(x=>x.id===id);
  found?found.qty++:cart.push({...p,qty:1});
  localStorage.setItem("vastralaya-cart",JSON.stringify(cart)); renderCart(); openCart();
}
function removeCart(id){
  cart=cart.filter(x=>x.id!==id); localStorage.setItem("vastralaya-cart",JSON.stringify(cart)); renderCart();
}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`
    <div class="cart-item"><div><b>${esc(x.n)}</b><br><small>${x.qty} × ${money(x.price)}</small></div><button class="remove" onclick="removeCart(${x.id})">REMOVE</button></div>`).join(""):"<p style='color:#777'>Your bag is empty.</p>";
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("backdrop").classList.add("open")}
function closeAll(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("searchOverlay").classList.remove("open");document.getElementById("quickView").classList.remove("open");document.getElementById("backdrop").classList.remove("open")}

function toggleWish(id){
  wishlist=wishlist.includes(id)?wishlist.filter(x=>x!==id):[...wishlist,id];
  localStorage.setItem("vastralaya-wishlist",JSON.stringify(wishlist));render();
}
function quickView(id){
  const p=products.find(x=>x.id===id);
  document.getElementById("quickContent").innerHTML=`<div class="quick-content"><img src="${IMAGES[p.img]}" alt="${esc(p.n)}"><div class="quick-copy"><span class="eyebrow">${p.tag}</span><h2>${esc(p.n)}</h2><div class="quick-price">${money(p.price)}</div><p>${esc(p.desc)}. Available sizes: ${p.size.join(", ")}.</p><p>For actual inventory, size availability and store assistance, contact Vastralaya directly.</p><button class="btn gold" onclick="addToCart(${p.id});document.getElementById('quickView').classList.remove('open')">ADD TO BAG</button></div></div>`;
  document.getElementById("quickView").classList.add("open");document.getElementById("backdrop").classList.add("open");
}

document.querySelectorAll(".filter-toggle").forEach(b=>b.addEventListener("click",()=>setFilter(b.dataset.filter)));
document.querySelectorAll("[data-filter-jump]").forEach(a=>a.addEventListener("click",()=>setTimeout(()=>setFilter(a.dataset.filterJump),50)));
document.querySelectorAll("[data-search]").forEach(a=>a.addEventListener("click",()=>{search=a.dataset.search;setTimeout(()=>render(),50)}));
document.getElementById("sortSelect").addEventListener("change",render);
document.getElementById("moreBtn").addEventListener("click",()=>document.getElementById("moreInfo").classList.toggle("show"));
document.getElementById("applyPrice").addEventListener("click",()=>{min=Number(document.getElementById("minPrice").value)||0;max=Number(document.getElementById("maxPrice").value)||Infinity;render()});
document.querySelectorAll(".color-filter").forEach(c=>c.addEventListener("change",()=>{selectedColors=[...document.querySelectorAll(".color-filter:checked")].map(x=>x.value);render()}));
document.querySelectorAll(".size-chips button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".size-chips button").forEach(x=>x.classList.remove("active"));if(selectedSize===b.dataset.size)selectedSize=null;else{selectedSize=b.dataset.size;b.classList.add("active")}render()}));
document.getElementById("mobileFilter").addEventListener("click",()=>document.getElementById("filters").classList.toggle("mobile-open"));
document.getElementById("cartBtn").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeAll);
document.getElementById("backdrop").addEventListener("click",closeAll);
document.getElementById("closeQuick").addEventListener("click",closeAll);
document.getElementById("searchBtn").addEventListener("click",()=>{document.getElementById("searchOverlay").classList.add("open");document.getElementById("backdrop").classList.add("open");document.getElementById("searchInput").focus()});
document.getElementById("closeSearch").addEventListener("click",closeAll);
document.getElementById("searchInput").addEventListener("input",e=>{
  search=e.target.value.toLowerCase();const r=filtered().slice(0,8);
  document.getElementById("searchResults").innerHTML=r.map(p=>`<div class="result" onclick="quickView(${p.id})"><span>${esc(p.n)}</span><b>${money(p.price)}</b></div>`).join("") || "<p style='color:#888'>No products found.</p>";
  render();
});
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("mobileMenu").classList.toggle("open"));
document.getElementById("wishlistBtn").addEventListener("click",()=>{search="";active="all";render();document.getElementById("collection").scrollIntoView({behavior:"smooth"});});
document.getElementById("checkoutBtn").addEventListener("click",()=>{
  if(!cart.length)return alert("Your bag is empty.");
  const items=cart.map(x=>`${x.n} × ${x.qty}`).join(", ");
  location.href="https://wa.me/917304140777?text="+encodeURIComponent("Hello Vastralaya, I would like to enquire about: "+items);
});
render();renderCart();
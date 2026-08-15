const img=[
"https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=82",
"https://images.unsplash.com/photo-1619020985209-852c1de42d42?auto=format&fit=crop&w=900&q=82",
"https://images.unsplash.com/photo-1599253366255-57649c2cd60e?auto=format&fit=crop&w=900&q=82",
"https://images.unsplash.com/photo-1605270985275-06b0cf93c744?auto=format&fit=crop&w=900&q=82",
"https://images.unsplash.com/photo-1536548665027-b96d34a005ae?auto=format&fit=crop&w=900&q=82",
"https://images.unsplash.com/photo-1599418175586-9355fef5c483?auto=format&fit=crop&w=900&q=82"
];
const products=[
{id:1,name:"Regent Black Blazer",cat:"blazers",price:7999,img:0,badge:"NEW",desc:"Tailored evening blazer"},
{id:2,name:"Imperial White Shirt",cat:"shirts",price:2499,img:1,badge:"BESTSELLER",desc:"Premium formal shirt"},
{id:3,name:"Royal Navy Suit Set",cat:"suits",price:12999,img:2,badge:"NEW",desc:"Two-piece occasion suit"},
{id:4,name:"Midnight Executive",cat:"blazers",price:8999,img:3,badge:"LIMITED",desc:"Deep-black tailored layer"},
{id:5,name:"Burgundy Luxe Shirt",cat:"shirts",price:2299,img:4,badge:"TRENDING",desc:"Rich-tone statement shirt"},
{id:6,name:"Heritage Check Shirt",cat:"shirts",price:2199,img:5,badge:"NEW",desc:"Classic checked weave"},
{id:7,name:"Royal Kurta",cat:"ethnic",price:3499,img:2,badge:"FESTIVE",desc:"Occasion-ready kurta"},
{id:8,name:"Gold-Trim Nehru Jacket",cat:"ethnic",price:4999,img:1,badge:"ROYAL EDIT",desc:"Statement festive layer"},
{id:9,name:"Black Formal Trousers",cat:"trousers",price:2799,img:0,badge:"ESSENTIAL",desc:"Sharp tailored trousers"},
{id:10,name:"Velvet Evening Blazer",cat:"blazers",price:9999,img:2,badge:"EVENING",desc:"Deep velvet finish"},
{id:11,name:"Classic White Oxford",cat:"shirts",price:1999,img:4,badge:"ESSENTIAL",desc:"Everyday premium cotton"},
{id:12,name:"Charcoal Suit Set",cat:"suits",price:11999,img:3,badge:"SIGNATURE",desc:"Modern formal tailoring"},
{id:13,name:"Royal Sherwani Set",cat:"ethnic",price:14999,img:1,badge:"BESPOKE",desc:"Festive statement ensemble"},
{id:14,name:"Midnight Formal Shoes",cat:"shoes",price:3999,img:0,badge:"NEW",desc:"Polished formal footwear"},
{id:15,name:"Signature Gold Watch",cat:"accessories",price:4999,img:2,badge:"SIGNATURE",desc:"Classic gold-tone timepiece"},
{id:16,name:"V Signature Cufflinks",cat:"accessories",price:1499,img:5,badge:"ACCESSORY",desc:"Finishing detail"},
{id:17,name:"Silk Pocket Square",cat:"accessories",price:999,img:4,badge:"NEW",desc:"Royal-tone accent"},
{id:18,name:"Leather Formal Belt",cat:"accessories",price:1299,img:3,badge:"ESSENTIAL",desc:"Minimal polished finish"}
];
let active="all",cart=JSON.parse(localStorage.getItem("vastralaya-cart")||"[]");
const money=n=>"₹"+n.toLocaleString("en-IN");
function render(){
 let list=products.filter(p=>active==="all"||p.cat===active);
 const sort=document.getElementById("sortSelect").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
 document.getElementById("resultCount").textContent=list.length+" styles";
 document.getElementById("products").innerHTML=list.map(p=>`<article class="product"><div class="product-image"><img loading="lazy" src="${img[p.img]}" alt="${p.name}"><span class="badge">${p.badge}</span><button class="wish" aria-label="Wishlist">♡</button></div><div class="product-info"><div class="product-brand">VASTRALAYA MEN'S WEAR</div><div class="product-name">${p.name}</div><div class="product-meta"><span>${p.desc}</span><span class="price">${money(p.price)}</span></div><div class="product-actions"><button class="add" onclick="addToCart(${p.id})">Add to bag</button></div></div></article>`).join("");
}
function addToCart(id){let p=products.find(x=>x.id===id),x=cart.find(x=>x.id===id);x?x.qty++:cart.push({...p,qty:1});localStorage.setItem("vastralaya-cart",JSON.stringify(cart));renderCart();openCart()}
function renderCart(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><div><b>${x.name}</b><br><small>${x.qty} × ${money(x.price)}</small></div><button class="line-btn" onclick="removeCart(${x.id})">Remove</button></div>`).join(""):"<p style='color:#777'>Your bag is empty.</p>";document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0))}
function removeCart(id){cart=cart.filter(x=>x.id!==id);localStorage.setItem("vastralaya-cart",JSON.stringify(cart));renderCart()}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("backdrop").classList.add("open")}
function closePanels(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("searchPanel").classList.remove("open");document.getElementById("backdrop").classList.remove("open")}
document.querySelectorAll(".side-filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".side-filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");active=b.dataset.filter;render()});
document.querySelectorAll("[data-jump]").forEach(a=>a.onclick=()=>{active=a.dataset.jump;const b=document.querySelector(`.side-filter[data-filter="${active}"]`);if(b){document.querySelectorAll(".side-filter").forEach(x=>x.classList.remove("active"));b.classList.add("active")}});
document.getElementById("sortSelect").onchange=render;
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closePanels;document.getElementById("backdrop").onclick=closePanels;
document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchPanel").classList.add("open");document.getElementById("backdrop").classList.add("open");setTimeout(()=>document.getElementById("searchInput").focus(),100)};
document.getElementById("closeSearch").onclick=closePanels;
document.getElementById("searchInput").oninput=e=>{let q=e.target.value.toLowerCase();document.getElementById("searchResults").innerHTML=q?products.filter(p=>(p.name+p.cat+p.desc).toLowerCase().includes(q)).map(p=>`${p.name} — ${money(p.price)}`).join("<br>")||"No styles found.":"");
document.getElementById("menuBtn").onclick=()=>document.getElementById("mainNav").classList.toggle("mobile");
document.getElementById("mobileFilter").onclick=()=>document.querySelector(".filters").classList.toggle("mobile");
const groupLink="";document.getElementById("whatsappGroup").onclick=e=>{e.preventDefault();groupLink?open(groupLink,"_blank"):alert("Send the Vastralaya WhatsApp group invite link to activate this button.")};document.getElementById("footerWhatsApp").onclick=document.getElementById("whatsappGroup").onclick;
document.getElementById("checkoutBtn").onclick=()=>{if(!cart.length)return alert("Your bag is empty.");const t=cart.map(x=>`${x.name} × ${x.qty}`).join(", ");location.href="https://wa.me/917304140777?text="+encodeURIComponent("Hello Vastralaya, I would like to enquire about: "+t)};
render();renderCart();

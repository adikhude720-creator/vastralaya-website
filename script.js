const products = [
  {id:1,name:"The Regent Blazer",cat:"blazers",price:12990,desc:"Structured evening blazer"},
  {id:2,name:"The Heritage Shirt",cat:"shirts",price:2490,desc:"Rich-fabric formal shirt"},
  {id:3,name:"Signature Cufflinks",cat:"accessories",price:1490,desc:"Polished statement accessory"},
  {id:4,name:"The V Watch",cat:"accessories",price:4990,desc:"Classic Vastralaya timepiece"},
  {id:5,name:"The Black Label Blazer",cat:"blazers",price:14990,desc:"Sharp tailored silhouette"},
  {id:6,name:"The Executive Shirt",cat:"shirts",price:2290,desc:"Everyday refined essential"},
  {id:7,name:"Gold Tie Bar",cat:"accessories",price:990,desc:"Minimal finishing detail"},
  {id:8,name:"The Evening Shirt",cat:"shirts",price:2990,desc:"Occasion-ready formalwear"}
];

let cart = JSON.parse(localStorage.getItem("vastralaya-cart") || "[]");

const money = n => "₹" + n.toLocaleString("en-IN");
const productsEl = document.getElementById("products");

function renderProducts(filter="all", query=""){
  const list = products.filter(p =>
    (filter==="all" || p.cat===filter) &&
    (!query || `${p.name} ${p.cat} ${p.desc}`.toLowerCase().includes(query.toLowerCase()))
  );
  productsEl.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-image"><span>V</span></div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-meta"><span>${p.desc}</span><span class="product-price">${money(p.price)}</span></div>
        <button class="add" onclick="addToCart(${p.id})">Add to selection</button>
      </div>
    </article>`).join("") || `<p>No pieces found.</p>`;
}

function addToCart(id){
  const p = products.find(x=>x.id===id);
  const found = cart.find(x=>x.id===id);
  if(found) found.qty++;
  else cart.push({...p,qty:1});
  saveCart();
  openCart();
}

function saveCart(){
  localStorage.setItem("vastralaya-cart",JSON.stringify(cart));
  renderCart();
}

function renderCart(){
  document.getElementById("cartCount").textContent = cart.reduce((s,x)=>s+x.qty,0);
  document.getElementById("cartItems").innerHTML = cart.length
    ? cart.map(x=>`<div class="cart-item"><div><strong>${x.name}</strong><br><small>${x.qty} × ${money(x.price)}</small></div><button onclick="removeFromCart(${x.id})">Remove</button></div>`).join("")
    : `<p style="color:#777">Your selection is empty.</p>`;
  document.getElementById("cartTotal").textContent = money(cart.reduce((s,x)=>s+x.price*x.qty,0));
}

function removeFromCart(id){ cart=cart.filter(x=>x.id!==id); saveCart(); }

function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("backdrop").classList.add("open");}
function closePanels(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("searchPanel").classList.remove("open");document.getElementById("backdrop").classList.remove("open");}

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closePanels;
document.getElementById("backdrop").onclick=closePanels;
document.getElementById("closeSearch").onclick=closePanels;

document.getElementById("searchBtn").onclick=()=>{
  const p=document.getElementById("searchPanel"); p.classList.add("open"); document.getElementById("backdrop").classList.add("open");
  setTimeout(()=>document.getElementById("searchInput").focus(),100);
};
document.getElementById("searchInput").addEventListener("input",e=>{
  const q=e.target.value;
  const results=products.filter(p=>`${p.name} ${p.cat} ${p.desc}`.toLowerCase().includes(q.toLowerCase()));
  document.getElementById("searchResults").innerHTML=q ? results.map(p=>`${p.name} — ${money(p.price)}`).join("<br>") || "No matching pieces." : "";
});

document.getElementById("checkoutBtn").onclick=()=>{
  if(!cart.length) return alert("Your selection is empty.");
  const text = cart.map(x=>`${x.name} × ${x.qty}`).join(", ");
  window.location.href = `https://wa.me/917304140777?text=${encodeURIComponent("Hello Vastralaya, I would like to enquire about: " + text)}`;
};

document.querySelector(".menu-toggle").onclick=()=>document.querySelector(".nav").classList.toggle("mobile");

renderProducts();
renderCart();

// létrehozunk egy tömböt,belepakolunk bele termékeket majd a HTML-ben meg fogunk jeleniteni
const products = [
  {
    id: 1,
    Név: "Chevrolet Blazer",
    Kép: "new_car/Blazer.jpg",
    Típus: "SUV",
    Ár: 38000000,
    Raktáron: true,
  },
  {
    id: 2,
    Név: "Chevrolet Colorado",
    Kép: "new_car/Colorado.jpg",
    Típus: "SUV",
    Ár: 4800000,
    raktáron: true,
  },
  {
    id: 3,
    Név: "Chevrolet Equinox",
    Kép: "new_car/Equinox.jpg",
    Típus: "SUV",
    Ár: 2800000,
    Raktáron: true,
    Variációk: ["kék", "fekete"],
  },
  {
    id: 4,
    Név: "Chevrolet Aveo",
    Kép: "used_car/Aveo.jpg",
    Típus: "Sedan",
    Ár: 1800000,
    Raktáron: true,
  },
  {
    id: 5,
    Név: "Chevrolet Camaro",
    Kép: "used_car/Camaro.jpg",
    Típus: "Coupe",
    Ár: 1800000,
    Raktáron: true,
  },
  {
    id: 6,
    Név: "Chevrolet Captiva",
    Kép: "used_car/Captiva.jpg",
    Típus: "SUV",
    Ár: 34900000,
    Raktáron: true,
  },
  {
    id: 7,
    Név: "Chevrolet Corvette",
    Kép: "used_car/Corvette.jpg",
    Típus: "Coupe",
    Ár: 74900000,
    Raktáron: true,
  },
  {
    id: 8,
    Név: "Chevrolet Cruze",
    Kép: "used_car/Cruze.jpg",
    Típus: "Ferdehátú",
    Ár: 22900000,
    Raktáron: true,
  },
  {
    id: 9,
    Név: "Chevrolet Orlando",
    Kép: "used_car/Orlando.jpg",
    Típus: "Egyterű",
    Ár: 28990000,
    Raktáron: true,
  },
  {
    id: 10,
    Név: "Chevrolet Silverado",
    Kép: "used_car/Silverado.jpg",
    Típus: "Pickup",
    Ár: 54900000,
    Raktáron: true,
  },
  {
    id: 11,
    Név: "Chevrolet Spark",
    Kép: "used_car/Spark.jpg",
    Típus: "Ferdehátú",
    Ár: 16990000,
    Raktáron: true,
  },
  {
    id: 12,
    Név: "Chevrolet Suburban",
    Kép: "used_car/Suburban.jpg",
    Típus: "Pickup",
    Ár: 46990000,
    Raktáron: true,
  },
  {
    id: 13,
    Név: "Chevrolet Tahoe",
    Kép: "used_car/Tahoe.jpg",
    Típus: "Pickup",
    Ár: 46990000,
    Raktáron: true,
  },
  {
    id: 14,
    Név: "Chevrolet Trax",
    Kép: "used_car/Trax.jpg",
    Típus: "Kombi",
    Ár: 36990000,
    Raktáron: true,
  }
];

$(document).ready(function () {
  const vegburger = document.getElementById("vegburger");
  const nav = document.getElementById("nav");
  const TABLE = $("table");
  let txt1 = tabla();
  TABLE.html(txt1);
});

// klikkre css osztályokat cserélünk
vegburger.addEventListener("click", function () {
  nav.classList.toggle("menu-active");
  vegburger.classList.toggle("fi-align-justify");
  vegburger.classList.toggle("fi-arrow-left");
});

nav.addEventListener("mouseleave", () => {
  nav.classList.remove("menu-active");
  vegburger.classList.remove("fi-arrow-left");
  vegburger.classList.add("fi-align-justify");
});

const productsSection = document.getElementById("products");
products.forEach((product) => {
  productsSection.innerHTML += `<div>
    <h2>${product.Név}</h2>
    <p>${product.Típus}</p>
    <img src="./img/${product.Kép}"></img>
    <h3>${product.Ár} Ft</h3>
    <a id ="${product.id}" class="addToCart">Kosárba</a>
    </div>`;
});

// ***********kosár kezelése*************

const cart = {};
const addToCartButtons = document.getElementsByClassName("addToCart");
const buttonCount = addToCartButtons.length;
for (let i = 0; i < buttonCount; i++) {
  addToCartButtons[i].addEventListener("click", function (event) {
    if (cart[event.target.id] == undefined) {
      cart[event.target.id] = 1;
    } else {
      cart[event.target.id] += 1;
    }
  });
}

const cartIcon = document.getElementById("cart-icon");
const cartContent = document.getElementById("cart-content");
const cartItems = document.getElementById("cart-items");
let total = 0;
cartIcon.addEventListener("click", function () {
  cartContent.classList.toggle("active");
  cartItems.innerHTML = "";
  for (const id in cart) {
    const currentProduct = products.find((product) => product.id == id);
    cartItems.innerHTML += `<li> ${cart[id]} db ${currentProduct.Név} * ${currentProduct.Ár} Ft/db <button data-id="{currentProduct.id}"> + </button></li>`;
    total += currentProduct.Ár * cart[id];
  }
  cartItems.innerHTML += `<li>Összesen: ${total} Ft</li>`;
});



function tabla() {
  let txt1 =
    "<table id ='tabla' class='table-responsive'><thead class='table-dark'><tr>";
  for (const kulcs in products[0]) {
    txt1 += `<th onclick="sortTable(0)">${kulcs}</th>`;
  }
  txt1 += `</tr></thead><tbody>`;
  for (let index = 0; index < products.length; index++) {
    txt1 += `<tr>`;
    for (const kulcs in products[index]) {
      if (kulcs == "Kép") {
        txt1 += `<td><img src="./img/${products[index].Kép}"></img></td>`;
      } else {
        txt1 += `<td>${products[index][kulcs]}</td>`;
      }
    }
    txt1 += `</tr>`;
  }

  txt1 += "</tbody></table>";
  return txt1;
}

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

/** 
// adattípusok
// számok
const n1 = 5  
const n2 = 7
n1 + n2

//stringek
const greeting = 'Hello'
greeting.length // vissza adja a fenti szöveg hosszát

// boolen
const inStock = true 
// pl. ha egy webáruházban szeretném megnézni,hogy van-e készleten

//tömb
const tomb = ['málna' ,'eper' ,'áfonya']

//objektum
const malna={
    name: 'málna',
    picture: 'malna.jpg',
    price: 3800,

}
// malna.picture // így hivatkozunk rájuk

//állandok:
const VAT = 27

//változók:
let def = 55 // pl. kosárnál ezt használják
var
*/

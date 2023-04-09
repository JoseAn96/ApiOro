const productos = [
    {
        id: 1,
        nombre: "Botella de Miel 950g",
        precio: 5000,
        cantidad: 1,
        img: "img/bp.png",
    },
    {
        id: 2,
        nombre: "Botella de Miel 500g",
        precio: 3000,
        cantidad: 1,
        img: "img/Botella_Med.png",
    },
    {
        id: 3,
        nombre: "Cuarta de Miel 250g",
        precio: 2000,
        cantidad: 1,
        img: "img/Pacha.png",
    },
    {
        id: 4,
        nombre: "Frasco de Miel con Panal 500g",
        precio: 5000,
        cantidad: 1,
        img: "img/fGra.png",
    },
    {
        id: 5,
        nombre: "Frasco de Miel con Panal 250g",
        precio: 3000,
        cantidad: 1,
        img: "img/fMediano.png",
    },
    {
        id: 6,
        nombre: "Frasco de Miel con Panal 140g",
        precio: 2000,
        cantidad: 1,
        img: "img/fPq.png",
    }];

let carrito = [];
const myModal = document.querySelector(".modal-body");
const doc = document.getElementById("pMain");

productos.forEach((p) => {
    let cta = document.createElement("div");
    cta.className = "card";
    cta.innerHTML = `
    <img src="${p.img}">
    <h3>${p.nombre}</h3>
    <p>₡ ${p.precio}</p>
    <div class="contCa">

    <button id="dis${p.id}" class="btn btn-light dismi"> - </button>
    <span id="num${p.id}" class="num">${p.cantidad}</span>
    <button id="au${p.id}" class="btn btn-light aumentar"> + </button>

    </div>
    <button id="btn-add${p.id}" class="btnComprar">Añadir al carrito</button>`;
    doc.append(cta);

    /* Acciones de la cantidad de productos */
    const auMas = document.getElementById(`au${p.id}`);
    const auMenos = document.getElementById(`dis${p.id}`);
    const tProd = document.getElementById(`num${p.id}`);

    auMas.addEventListener("click", () => {
        if (p.cantidad < 99) {
            tProd.innerText = aumentarProducto(p.id, 1);
            console.log(productos);
        }
    });

    auMenos.addEventListener("click", () => {
        if (p.cantidad > 1) {
            tProd.innerText = aumentarProducto(p.id, -1);
            console.log(productos);

        }
    });

    /* Accion del boton */
    const btnAdd = document.getElementById(`btn-add${p.id}`);

    const ti = () => {
        btnAdd.innerText = "Añadir al carrito";
    }

    btnAdd.addEventListener("click", () => {
        if(carrito.length >= 1){
            const repitProduct = carrito.find((i) => i.id === p.id);
            if(repitProduct){}else{addProducto(p.id); console.log(carrito);}
        }else{
            addProducto(p.id);
            console.log(carrito);
            console.log("carrito");
        }

        btnAdd.innerText = "Añadiendo....";
        setTimeout(ti,2000);
    });

});

const aumentarProducto = (pId, cant) => {
    const iProd = productos.find((i) => i.id === pId);
    iProd.cantidad += cant;
    return iProd.cantidad;
}

const addProducto = (pId) => {
    const productoI = productos.find((i) => i.id === pId);
    carrito.push({
        id: productoI.id,
        img: productoI.img,
        nombre: productoI.nombre,
        precio: productoI.precio,
        cantidad: productoI.cantidad,
    });
    
    verCart();
}

const borrarItem = (pId) => {
    const deItem = carrito.find((i) => i.id === pId);
    const ini = carrito.indexOf(deItem);
    carrito.splice(ini, 1);
    verCart();
}

const aumentarProductoCart = (pId, cant) => {
    const iProd = carrito.find((i) => i.id === pId);
    iProd.cantidad += cant;
    return iProd.cantidad;
}


const verCart = () => {
    
    myModal.innerHTML = ""
    carrito.forEach((p) => {
        let c = document.createElement("div");
        c.className = "row rowEdit";
        c.innerHTML = `
        <div class="col-2 text-center">
        <button id="btnBorrar${p.id}" class="btn btn-danger btnEl"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="col-4 text-center mt-3">
        <p>${p.nombre}</p>
        </div>
        <div class="col-4 text-center" class="contCa">
        <button id="au2${p.id}" class="btn btn-light"> + </button>
        <span id="num2${p.id}">${p.cantidad}</span>
        <button id="dis2${p.id}" class="btn btn-light"> - </button>
        </div>
        <div class="col-2 text-center">
        <p>${p.precio}</p>
        </div>`;
        myModal.append(c);
        /* Accion -/+ */
        const disminuirItemCart = document.getElementById(`dis2${p.id}`);
        const aumentarItemCart = document.getElementById(`au2${p.id}`);
        const cantidadItemCart = document.getElementById(`num2${p.id}`);

        disminuirItemCart.addEventListener("click", () =>{
            if (p.cantidad > 1) {
                cantidadItemCart.innerText = aumentarProductoCart(p.id, -1);
                console.log(carrito);
    
            }
            verCart();
        });

        aumentarItemCart.addEventListener("click", () =>{
            if (p.cantidad < 99) {
                cantidadItemCart.innerText = aumentarProductoCart(p.id, 1);
                console.log(carrito);
            }
            verCart();
        });

        /* Accion del delete */
        const btnBorrar = document.getElementById(`btnBorrar${p.id}`);

        btnBorrar.addEventListener("click",() =>{
            borrarItem(p.id);
        });
    });

    const total = document.getElementById("precioTotal");
    total.innerText = "₡ " + carrito.reduce((a,p) => a + (p.cantidad * p.precio), 0);
}

const enviarCarrito = () =>{

    let envioW = carrito.map(p => `{${p.nombre}, Cantidad ${p.cantidad}, ₡${p.precio}}`);
    const res = envioW.join(`,`);
    console.log(res);
    let montoTotal = carrito.reduce((a,p) => a + (p.cantidad * p.precio), 0);
    console.log(JSON.stringify(montoTotal));

    window.location.href = 'https://wa.me/50685367858?text=Me%20interesan%20los%20siguientes%20productos ,' + '' + res + '+Total a pagar: ₡' +JSON.stringify(montoTotal);
}
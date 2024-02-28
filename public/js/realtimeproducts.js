const socket = io();

const lista = document.querySelector('#listaProductos');

socket.on('updated', (data) => {
console.log("linea 6 archivo realtimeproducts",data)
    lista.innerHTML = '';
    for (let i = 0; i < Object.keys(data.products).length; i++) {
console.log("linea 9 archivo realtimeproducts", i)        
        lista.innerHTML += `<ul><li>ID: ${data.products[i].id}</li>
                            <li>Nombre: ${data.products[i].title}</li>
                            <li>Codigo: ${data.products[i].code}</li>
                            <li>Precio: ${data.products[i].price}</li>
                            <li>Categoria: ${data.products[i].category}</li>
                            <li>Stock: ${data.products[i].stock}</li></ul>`;
}
});
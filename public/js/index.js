/* const socket = io();

const lista = document.querySelector('#listaProductos');

socket.on('updated', (data) => {
    lista.innerHTML = '';
    for (let i = 0; i < Object.keys(data.products).length; i++) {
        lista.innerHTML += `<ul><li>ID: ${data.products[i + 1].id}</li>
                            <li>Nombre: ${data.products[i + 1].title}</li>
                            <li>Codigo: ${data.products[i + 1].code}</li>
                            <li>Precio: ${data.products[i + 1].price}</li>
                            <li>Categoria: ${data.products[i + 1].category}</li>
                            <li>Stock: ${data.products[i + 1].stock}</li></ul>`;
    }
}); */
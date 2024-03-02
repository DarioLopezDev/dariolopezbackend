const socket = io();

const lista = document.querySelector('#listaProductos');

socket.on('updated', (data) => {
console.log(data)
    lista.innerHTML = '';
    for (let i = 0; i < data.length; i++) {    
        lista.innerHTML += `<ul><li>ID: ${data[i].id}</li>
                            <li>Nombre: ${data[i].title}</li>
                            <li>Codigo: ${data[i].code}</li>
                            <li>Precio: ${data[i].price}</li>
                            <li>Categoria: ${data[i].category}</li>
                            <li>Stock: ${data[i].stock}</li></ul>`;
}
});

    const form = document.getElementById('form');
    const title = document.getElementById('title');
    const desc = document.getElementById('desc');
    const code = document.getElementById('code');
    const price = document.getElementById('price');
    const stat = document.getElementById('stat');
    const stock = document.getElementById('stock');
    const category = document.getElementById('category');
    const thumbs = document.getElementById('thumbs');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        /* const statVal = () => {
            if (stat.value == 'on') {
                return true
            } else {
                return false
            }
        } */

        //if (input.value) {
        socket.emit('new product', { title: title.value, desc: desc.value, code: code.value, price: Number(price.value), stat: true, stock: Number(stock.value), category: category.value, thumbs: thumbs.value });
        title.value = '';
        desc.value = '';
        code.value = '';
        price.value = '';
        stat.value = '';
        stock.value = 0;
        category.value = '';
        thumbs.value = '';
        //}
    });

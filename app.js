// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Almacenamiento de productos en memoria
let products = [];

// Rutas

// Obtener todos los productos
app.get('/products', (req, res) => {
    res.json(products);
});

// Obtener un producto por ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send('Producto no encontrado');
    }
    res.json(product);
});

// Crear un nuevo producto
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || price == null) {
        return res.status(400).send('Nombre y precio son requeridos');
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Actualizar un producto existente
app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send('Producto no encontrado');
    }

    const { name, price } = req.body;
    if (name) product.name = name;
    if (price != null) product.price = price;

    res.json(product);
});

// Eliminar un producto
app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
        return res.status(404).send('Producto no encontrado');
    }

    products.splice(productIndex, 1);
    res.status(204).send(); // No Content
});

// Servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/canciones', (req, res)=> {
    const nuevaCancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json'));
    canciones.push(nuevaCancion);
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    return res.send('se ha agregado una nueva canción')
})

app.get('/canciones', (req, res)=> {
    const cancionesAgregadas = JSON.parse(fs.readFileSync('canciones.json'));
    return res.send(cancionesAgregadas);
});

app.put('/canciones/:id', (req, res) => {
    const idCancion = req.params.id
    let cancionesAgregadas = JSON.parse(fs.readFileSync('canciones.json'));
    const nuevaCancion = req.body;
    cancionesAgregadas = cancionesAgregadas.map((cancion) => {
        if(String(cancion.id) === String(idCancion)) {
            cancion = nuevaCancion
        }
        return cancion
    });
    fs.writeFileSync('canciones.json', JSON.stringify(cancionesAgregadas));
    return res.send(nuevaCancion);
});

app.delete('/canciones/:id', (req, res) => {
    const idCancion = req.params.id;
    let cancionesAgregadas = JSON.parse(fs.readFileSync('canciones.json'));
    cancionesAgregadas = cancionesAgregadas.filter((cancion) => String(cancion.id) !== String(idCancion));
    fs.writeFileSync('canciones.json', JSON.stringify(cancionesAgregadas));
    return res.send('eliminada')
});

const PORT = 3000
app.listen(PORT, console.log(`puerto ${PORT}`));
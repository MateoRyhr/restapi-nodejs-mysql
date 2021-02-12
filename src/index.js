const express = require('express')
const os = require('os')

const app = express()//creamos el servidor

//settings
app.set('port', process.env.PORT || 3000)//process.env.port toma el puerto del ambiente donde ejecutemos (servicio administrado)



// middlewares --> funciones que se ejecutan antes de procesar algo
app.use(express.json())//--> para reconocer el objeto de solicitud entrante como un objeto JSON



// routes --> las rutas del servidor para que hagan las consultas
app.use(require('./routes/employees'))



app.listen(app.get('port'), () => {//ponemos a escuchar el servidor
    console.log(`Server on port ${app.get('port')}`)
})
const mysql = require('mysql')


// Creamos y configuramos la conexion
const mysqlConnection = mysql.createConnection({//recibe un objeto de configuracion
    host: 'localhost',//donde esta alojada la base de datos
    user: 'root',//nombre del usuario
    password: '153214',
    database: 'company'
})

//nos conectamos a la db
                    //puede que obtenga un error al conectarse
mysqlConnection.connect((err) => {
    if(err){
        console.log(new Error('Error'))
        return
    } else{
        console.log('DB is connected')
    }
})

module.exports = mysqlConnection
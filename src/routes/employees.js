const express = require('express')
const router = express.Router()

const mysqlConnection = require('../database')

//Creamos una ruta - la inicial
router.get('/', (req,res) => {
    //cuando recibimos la peticion hacemos un query
    mysqlConnection.query('SELECT * FROM employees',(err,rows, fields) => {
        if(!err){
            res.json(rows)
        } else {
            console.error(new Error('Error'))   
        }
    })
})

router.get('/:id', (req,res) => {
    //obtenemos el id
    const { id } = req.params
    mysqlConnection
        .query(`SELECT * FROM employees 
                WHERE id = ${id}`,
                (err,rows,fields) => {
                    if(!err){
                        res.json(rows[0])
                    } else {
                        console.error(new Error('Error'))
                    }
                }
        )
})

router.post('/',(req,res) => {
    //en request.body recibimos la informarción de los metodos POST o UPDATE
    const {id, name, salary} = req.body

    const query = `CALL employeeAddOrEdit(?,?,?);`;//usamos un procedimiento almacenado en la base de datos
    mysqlConnection.query(query,[id,name,salary],(err,rows,fields) => {
        if(!err){
            res.json({Status: 'Employee saved'})
        } else {
            console.error(new Error('Error'))
        }
    })
})

router.put('/:id',(req,res) => {
    const {name , salary} = req.body
    const { id } = req.params

    const query = 'CALL employeeAddOrEdit(?,?,?);'
    mysqlConnection.query(query,[id,name,salary],(err,rows,fields) => {
        if(!err){
            res.json({status: 'Employee updated'})
        } else {
            console.error(new Error('Error'))
        }
    })
})

router.delete('/:id',(req,res) => {
    const { id } = req.params
    const query = `DELETE FROM employees WHERE id = ${id}`
    mysqlConnection.query(query,(err,rows,fields) => {
        if(!err){
            res.json({status: `Employee ${id} was deleted`})
        } else {
            console.error(new Error('Error'))
        }
    })
})

module.exports = router
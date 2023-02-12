const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql =  require('mysql');

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));

const port = process.env.PORT || 3307 ;

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database:'users',
    user:'root',
    password:''
})

db.connect((err)=>{
    if(err){
        console.log('error occured while connecting db');
    }else{
        console.log('connection established db')
    }
})



app.post('/api/user/register', (req,res) => {
    let {name, email, password} = req.body;
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    let errors = 0

    if (!regexEmail.test(email)) {
       errors = errors + 1 
    }

    if(!password.length > 7){
        errors = errors + 1 
    }

    if(errors === 0){
        const sqlQuery = "INSERT INTO users(name,email,password) VALUES(?,?,?)";
        db.query(sqlQuery, [name, email, password], (err, result) => {
            if(result){
                res.send(result)
                console.log(result)
            }else if(err){
                console.log(err);
                return res.status(400).send({message: err.sqlMessage})
            }else{
                return res.send({"message": "Unable to create user"})
            }
        })
    }else{
        res.send({"message": "data validation error"})
    }

})

app.post('/api/user/login', (req,res) =>{
    let {email, password} = req.body;
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    let errors = 0
    if (!regexEmail.test(email)) {
       errors = errors + 1 
    }

    if(!password.length > 7){
        errors = errors + 1 
    }

    if(errors === 0){
        const sqlQuery = "SELECT * FROM users WHERE email = ?";
        db.query(sqlQuery, email, (err, result) => {
            if(err){
                console.log(err);
                return res.status(400).send({message: err.sqlMessage})
            }
            if(result && result[0]){
                let user = result[0];
                if(password === user.password){
                    delete user.password;
                    return res.status(200).send(user)
                }else{
                    return res.status(400).send({message: "Please enter a valid password"})
                }
            }

            res.status(400).send({message: "Please enter a valid email address"})
        })

    }else{
        res.status(400).send({message:"Please enter a valid email and password"})
    }
})

app.get('/api/users',(req,res)=>{
    const sqlQuery = "SELECT id,name,email FROM users";
    db.query(sqlQuery,(err,result)=>{

        if(err){
            console.log(err);
            return res.status(400).send({message: err.sqlMessage})
        }
        if(result){
            return res.send(result);
        }
        res.status(400).send({messagge:"unable to get the users"})
    })
})

app.get('/api/user/:id', (req, res)=>{
    let userID = req.params.id;
    const sqlQuery = "SELECT name,email FROM users WHERE id = ?";
    if(userID === null || userID === undefined || userID === ''){
        return res.status(400).send({message: "Invalid user"})
    }

    db.query(sqlQuery, [userID], (err, result) => {
        if(err){
            console.log(err);
            return res.status(400).send({message: err.sqlMessage})
        }
        if(result && result[0]){
            return res.status(200).send(result[0])
        }
        res.status(400).send({message:"unable to get user"})
    })

})

app.put('/api/user/:id',(req,res) => {
    let userID = req.params.id;
    let {name,password} = req.body;
    const sqlQuery = "UPDATE users SET name=?, password= ? WHERE id = ?";

    if(userID === null || userID === undefined || userID === ''){
        return res.status(400).send({message: "Invalid user"})
    }

    if(password.length < 7){
        return res.status(400).send({message:" PLease enter a valid password"})
    }

    db.query(sqlQuery, [name, password, userID], (err, result) => {
        if(err){
            console.log(err);
            return res.status(400).send({message: err.sqlMessage})
        }
        if(result){
            return res.status(200).send({message : "User is updated successfully"})
        }
        res.status(400).send({message:"unable to update the user"})
    })

})

app.delete('/api/user/:id', (req,res) => {
    let userID = req.params.id;
    if(userID === null || userID === undefined || userID === ''){
        return res.status(400).send({message: "Invalid user"})
    }
    const sqlQuery = "DELETE FROM users WHERE id = ?";

    db.query(sqlQuery, [userID], (err, result) => {
        if(err){
            console.log(err);
            return res.status(400).send({message: err.sqlMessage})
        }
        if(result){
            return res.status(200).send({message : "User is deleted successfully"})
        }
        res.status(400).send({message:"unable to delete the user"})
    })
})

app.listen(port,()=>{
    console.log(`running on port http://localhost:${port}`);
})


const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senac',
    database: 'adotebem'
});

db.connect(err => {
    if (err) throw err;
    console.log('Banco de dados conectado!');
});


// Cadastro de usuário
app.post('/register', (req, res) => {
    const { nome, cpf, nascimento, telefone, email, senha } = req.body;
    db.query('INSERT INTO usuarios (nome, cpf, nascimento, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?)',
        [nome, cpf, nascimento, telefone, email, senha],
        (err) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: 'Usuário cadastrado!' });
        }
    );
});


// Cadastro de endereço
app.post('/endereco', (req, res) => {
    const { cep, cidade, bairro, numero, complemento } = req.body;
    db.query('INSERT INTO endereco (cep, cidade, bairro, numero, complemento) VALUES (?, ?, ?, ?, ?)',
        [cep, cidade, bairro, numero, complemento],
        (err) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: 'Endereço cadastrado!' });
        }
    );
});



// Login de usuário
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(401).json({ message: 'Email ou senha incorretos!' });
        res.json({ message: 'Login bem-sucedido!', redirect: 'index.html' });
    });
});



// Listar usuários
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios INNER JOIN endereco ON usuarios.id_usuario = endereco.id_endereco', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});




app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
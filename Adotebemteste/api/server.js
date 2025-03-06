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
app.post('/usuarios', (req, res) => {
    const { nome, cpf, nascimento, telefone, email, senha, cep, cidade, bairro, numero, complemento } = req.body;

    console.log('Dados recebidos no backend:', req.body); // Verifica os dados recebidos

    if (!nome || !cpf || !nascimento || !telefone || !email || !senha || !cep || !cidade || !bairro || !numero) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios!' });
    }

          
                db.query('INSERT INTO endereco (cep, cidade, bairro, numero, complemento) VALUES (?, ?, ?, ?, ?)',
                    [cep, cidade, bairro, numero, complemento], (err, enderecoResult) => {
                        if (err) {
                            console.error('Erro ao inserir endereço:', err);
                            return res.status(500).json({ message: 'Erro ao cadastrar endereço.' });
                        }

                        console.log('Endereço cadastrado com ID:', enderecoResult.insertId);
                        inserirUsuario(enderecoResult.insertId);
                    });

    function inserirUsuario(id_endereco) {
        db.query('INSERT INTO usuarios (nome, cpf, nascimento, telefone, email, senha, id_endereco) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nome, cpf, nascimento, telefone, email, senha, id_endereco], (err) => {
                if (err) {
                    console.error('Erro ao inserir usuário:', err);
                    return res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: err });
                }

                console.log('Usuário cadastrado com sucesso!');
                res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
            });
    }
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
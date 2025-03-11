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

    if (!nome || !cpf || !nascimento || !telefone || !email || !senha || !cep || !cidade || !bairro || !numero) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios!' });
    }

    // Primeiro, cadastra o endereço
    db.query('INSERT INTO endereco (cep, cidade, bairro, numero, complemento) VALUES (?, ?, ?, ?, ?)',
        [cep, cidade, bairro, numero, complemento], (err, enderecoResult) => {
            if (err) {
                console.error('Erro ao cadastrar endereço:', err);
                return res.status(500).json({ message: 'Erro ao cadastrar endereço.' });
            }

            // Pega o ID do endereço cadastrado
            const id_endereco = enderecoResult.insertId;

            // Agora, cadastra o usuário com o ID do endereço
            db.query('INSERT INTO usuarios (nome, cpf, nascimento, telefone, email, senha, id_endereco) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nome, cpf, nascimento, telefone, email, senha, id_endereco], (err, userResult) => {
                    if (err) {
                        console.error('Erro ao cadastrar usuário:', err);
                        return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
                    }

                    // Retorna o ID do usuário cadastrado
                    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', id_usuario: userResult.insertId });
                });
        });
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

// Cadastro de animais
app.post('/animais', (req, res) => {
    const { nome_animal, saude, raca, especie, porte, sexo, idade, id_usuario } = req.body;

    if (!nome_animal || !saude || !raca || !especie || !porte || !sexo || !idade || !id_usuario) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios!' });
    }

    db.query('INSERT INTO animais (nome, saude, raca, especie, porte, sexo, idade, id_tutor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nome_animal, saude, raca, especie, porte, sexo, idade, id_usuario], (err) => {
            if (err) {
                console.error('Erro ao cadastrar animal:', err);
                return res.status(500).json({ message: 'Erro ao cadastrar animal.' });
            }

            res.status(201).json({ message: 'Animal cadastrado com sucesso!' });
        });
});



// Login de usuário
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios!' });
    }

    db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
        if (err) {
            console.error(err);  
            return res.status(500).json({ message: 'Erro no banco de dados' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Email ou senha incorretos!' });
        }

        const usuario = results[0];

        // Separa o nome completo e pega apenas o primeiro nome
        const primeiroNome = usuario.nome.split(' ')[0];  // Pega a primeira parte do nome

        // Compara a senha (sem criptografia, apenas para exemplo)
        if (usuario.senha !== senha || usuario.email !== email) {
            return res.status(401).json({ message: 'Email ou senha incorretos!' });
        }

        // Envia o primeiro nome do usuário junto com a mensagem de sucesso
        res.json({
            message: 'Login bem-sucedido!',
            nome_usuario: primeiroNome,  // Envia apenas o primeiro nome
            redirect: 'indexUsuario.html'
        });
    });
});






// Listar usuários
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios INNER JOIN endereco ON usuarios.id_endereco = endereco.id_endereco', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});




app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

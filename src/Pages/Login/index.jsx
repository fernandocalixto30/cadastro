import { useState } from 'react';
import { supabase } from './../../../supabaseClient'; // Certifique-se de que o caminho está correto
import './style.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [nome, setNome] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(''); 

        try {
            
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: senha,
            });

            if (error) {
                setErro(error.message);
                return;
            }

            if (data && data.user) {
                const user = data.user;
             
                const { data: userData, error: fetchError } = await supabase
                    .from('users')
                    .select('nome')
                    .eq('id', user.id)
                    .single(); 

                if (fetchError) {
                    setErro('Erro ao recuperar nome');
                } else {
                    setNome(userData.nome); 
                    console.log('Usuário logado', user);
                    console.log('Nome do usuário:', userData.nome);
                    window.location.href = '/dashboard'; 
                    console.log('Usuário logado', user);
                    console.log('Nome do usuário:', userData.nome);
                 
                }
            } else {
                setErro('Usuário não encontrado ou erro no login');
            }
        } catch (err) {
            console.error('Erro ao tentar login:', err);
            setErro('Erro inesperado, tente novamente mais tarde.');
        }
    };

    return (
        <form className="login-container" onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className='login-input-container'>
                <label>E-mail</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className='login-input-container'>
                <label>Senha</label>
                <input
                    type="password"
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            <button type="submit" className="btn-submit">Login</button>

            {erro && <div className="erro">{erro}</div>} {/* Exibe erros abaixo do botão */}

            <div className="links">
              
                <a href="#" className="link-esqueceu-senha">Esqueceu a senha?</a>
                <p className="link-cadastrar">Não tem conta?  <Link to="/cadastro">Cadastre-se</Link> </p>
            </div>
        </form>
    );
};

export default Login;


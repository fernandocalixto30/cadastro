import { useState } from "react";
import "./style.css";
import { supabase } from "./../../../supabaseClient";

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [erros, setErros] = useState({});

    const validar = {
        email: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        senha: (value) => value.length >= 8,
        confirmaSenha: (value, senha) => value === senha,
    };

    const handleBlurEmail = () => {
        setErros((prevErros) => ({
            ...prevErros,
            email: validar.email(email) ? null : 'E-mail inválido'
        }));
    };

    const handleBlurSenha = () => {
        setErros((prevErros) => ({
            ...prevErros,
            senha: validar.senha(senha) ? null : 'A senha deve conter no mínimo 8 caracteres'
        }));
    };

    const handleBlurConfirmaSenha = () => {
        setErros((prevErros) => ({
            ...prevErros,
            confirmaSenha: validar.confirmaSenha(confirmaSenha, senha) ? null : 'Senhas não coincidem'
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

      
        const errosValidacao = {};
        if (!nome) errosValidacao.nome = 'O nome é obrigatório';
        if (!validar.email(email)) errosValidacao.email = 'E-mail inválido';
        if (!validar.senha(senha)) errosValidacao.senha = 'A senha deve conter no mínimo 8 caracteres';
        if (!validar.confirmaSenha(confirmaSenha, senha)) errosValidacao.confirmaSenha = 'Senhas não coincidem';

        if (Object.keys(errosValidacao).length > 0) {
            setErros(errosValidacao);
            return;
        }

        try {
      
            const { data, error } = await supabase.auth.signUp({
                nome,
                email,
                password: senha
            });

            if (error) {
                setErros((prevErros) => ({
                    ...prevErros,
                    geral: error.message
                }));
                return;
            }

         
            if (data.user) {
                const { error: insertError } = await supabase.from('users').insert([
                    { id: data.user.id, nome: nome, email }
                ]);

                if (insertError) {
                    setErros((prevErros) => ({
                        ...prevErros,
                        geral: "Erro ao salvar nome: " + insertError.message
                    }));
                } else {
                    setErros((prevErros) => ({
                        ...prevErros,
                        geral: "Cadastro realizado! Verifique seu e-mail."
                    }));
                }
            }
        } catch (err) {
            console.error("Erro inesperado:", err);
            setErros((prevErros) => ({
                ...prevErros,
                geral: "Erro inesperado. Tente novamente."
            }));
        }
    };

    return (
        <form className="cadastro-container" onSubmit={handleSubmit}>
            <h2>Cadastro</h2>

            <div className="input-container">
                <label>Nome</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    minLength={3}
                    required
                />
                {erros.nome && <span className="mensagem-erro">{erros.nome}</span>}
            </div>

            <div className="input-container">
                <label>E-mail</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleBlurEmail}
                />
                {erros.email && <span className="mensagem-erro">{erros.email}</span>}
            </div>

            <div className="input-container">
                <label>Senha</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onBlur={handleBlurSenha}
                />
                {erros.senha && <span className="mensagem-erro">{erros.senha}</span>}
            </div>

            <div className="input-container">
                <label>Confirmar Senha</label>
                <input
                    type="password"
                    value={confirmaSenha}
                    onChange={(e) => setConfirmaSenha(e.target.value)}
                    onBlur={handleBlurConfirmaSenha}
                />
                {erros.confirmaSenha && <span className="mensagem-erro">{erros.confirmaSenha}</span>}
            </div>

            <button type="submit" className="btn-submit">Cadastrar</button>

          
            {erros.geral && <span className="mensagem-erro">{erros.geral}</span>}
        </form>
    );
};

export default Cadastro;

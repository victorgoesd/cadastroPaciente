import React, { useState, useRef, useEffect , Fragment } from "react";
import { FaCheck, FaUserSlash, FaSearch, FaEdit, FaRegWindowClose, FaListAlt } from 'react-icons/fa';
import './Main.css';

export default function App() {

    // atributos do paciente
    const estadoInicial = () => JSON.parse(localStorage.getItem('pacientes')) || [];
    const [paciente, setPaciente] = useState(estadoInicial);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [endereco, setEndereco] = useState('');   
    const [sexo, setSexo] = useState('');
    const [status, setStatus] = useState('');
    const [isEdit, setEdit] = useState(false);
    const [index, setIndex] = useState(-1);
    const [busca, setBusca] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        console.log('form submitted ✅');
        // limpar inputs
        setNome('');
        setDataNascimento('');
        setCpf('');
        setEndereco('');
        setSexo('');
        setStatus('');
    };

    useEffect(() => {
        const data = localStorage.getItem('pacientes');        
        if (data !== null){
            setPaciente(JSON.parse(data));
        }
    }, [])

    // armazenando em localStorage
    useEffect(() => {
        localStorage.setItem('pacientes', JSON.stringify(paciente));
        
    }, [paciente]);

    

    // recebendo o valor dos atributos
    const enviar = () => {
        let temCpf = false;
        for (let i = 0; i < paciente.length; i++){
            if (cpf.valueOf() === paciente[i].cpf.valueOf()){
                temCpf = true;                
                alert('CPF já cadastrado');
                break;
            }
        }
        
        if (!temCpf){
            setPaciente([...paciente, {
                nome: nome,
                dataNascimento: dataNascimento,
                cpf: cpf,
                sexo: sexo,
                endereco: endereco,
                status: status,
            }])
        }
        
    }

    const editar = (indexRecebido, pacienteRecebido) => {
        setNome(pacienteRecebido.nome);
        setDataNascimento(pacienteRecebido.dataNascimento);
        setCpf(pacienteRecebido.cpf);
        setEndereco(pacienteRecebido.endereco);
        setSexo(pacienteRecebido.sexo);
        setStatus(pacienteRecebido.status);
        setEdit (true);
        setIndex(indexRecebido);       
    }

    const sendEdit = () => {
        const todosPacientes = [...paciente]
        todosPacientes[index] = {
            nome: nome,
            dataNascimento: dataNascimento,
            cpf: cpf,
            sexo: sexo,
            endereco: endereco,
            status: status,
        }
        setPaciente(todosPacientes);
        setIndex(-1);
        setEdit(false);
    }

    const cancelar = () => {
        setEdit(false);
        // limpar inputs
        setNome('');
        setDataNascimento('');
        setCpf('');
        setEndereco('');
        setSexo('');
        setStatus('');
    }

    const inativar = (indexRecebido) => {        
        console.log(indexRecebido);
        const todosPacientes = [...paciente]
        todosPacientes[indexRecebido] = {
            nome: todosPacientes[indexRecebido].nome,
            dataNascimento: todosPacientes[indexRecebido].dataNascimento,
            cpf: todosPacientes[indexRecebido].cpf,
            sexo: todosPacientes[indexRecebido].sexo,
            endereco: todosPacientes[indexRecebido].endereco,
            status: 'Inativo',
        }
        setPaciente(todosPacientes);
    }

    const lowerBusca = busca.toLowerCase();
    const nomeFiltrado = paciente.filter((pacienteLista) => pacienteLista.nome.toLowerCase().includes(lowerBusca));

    return (
        <div className="cadastro">
            <h1>{isEdit ? 'Edição de Paciente' : 'Cadastro de Paciente'}</h1>

            <div className="main">
                <form id="myForm" onSubmit={handleSubmit}>
                    <label className="l-nome">Nome:</label>
                    <input id="m-nome" type="text" placeholder="Insira o nome do paciente" onChange={e => setNome(e.target.value)} required value={nome} />

                    <label className="l-dataNascimento">Data de Nascimento:</label>
                    <input id="m-dataNascimento" type="date" placeholder="Insira a data de nascimento do paciente" onChange={e => setDataNascimento(e.target.value)} required value={dataNascimento} />

                    <label className="l-cpf">CPF:</label>
                    <input id="m-cpf" type="text" placeholder="Insira o CPF do paciente" onChange={e => setCpf(e.target.value)} required value={cpf}/>

                    <label className="l-sexo">Sexo:</label>
                    <input id="m-sexo1" type="radio" name="sexo" value="Masculino" checked={sexo === 'Masculino'} onChange={e => setSexo(e.target.value)} />
                    <div className="d-sexoMasc"><label htmlFor="m-sexo1" className="l-sexo1">Masculino</label></div>
                    <input id="m-sexo2" type="radio" name="sexo" value="Feminino" checked={sexo === 'Feminino'} onChange={e => setSexo(e.target.value)} />
                    <div className="d-sexoFem"><label htmlFor="m-sexo2" className="l-sexo2">Feminino</label></div>
                    <input id="m-sexo3" type="radio" name="sexo" value="Outro" checked={sexo === 'Outro'} onChange={e => setSexo(e.target.value)} />
                    <div className="d-sexoOutro"><label htmlFor="m-sexo3" className="l-sexo3">Outro</label></div>


                    <label className="l-endereco">Endereço:</label>
                    <input id="m-endereco" type="text" placeholder="Insira o endereço do paciente" onChange={e => setEndereco(e.target.value)} value={endereco}/>

                    <label className="l-status">Status:</label>
                    <input id="m-status1" type="radio" name="status" value="Ativo" checked={status === 'Ativo'} onChange={e => setStatus(e.target.value)} />
                    <div className="d-status1"><label className="l-status1">Ativo</label></div>
                    <input id="m-status2" type="radio" name="status" value="Inativo" checked={status === 'Inativo'} onChange={e => setStatus(e.target.value)} />
                    <div className="d-status2"><label className="l-status2">Inativo</label></div>

                    <div className="botoes">                    
                        <button onClick={isEdit? sendEdit : enviar} onChange={handleSubmit} type="submit" className="salvar">
                            <FaCheck className="icon-salvar" />
                            {isEdit ? 'Editar Paciente' : 'Adicionar Paciente'}
                        </button>                    
                    {
                        isEdit?
                   
                        <button onClick={cancelar} onChange={handleSubmit} type="submit" className="cancelar">
                            <FaRegWindowClose className="icon-cancelar" />
                            Cancelar Edição
                        </button>                    
                    :null
                    }
                    </div>               
                    
                </form>
            </div>
            <h2>Lista de Pacientes</h2>
            <div className="filtrar">
                <input id="procura" type="text" placeholder="Pesquise por nome"value={busca} onChange={(ev) => setBusca(ev.target.value)}/>
                <div className="d-procurar">
                    <span id="procurar">
                        <FaSearch className="icon-procura" />
                    </span>
                </div>

            </div>
            <div className="lista">
                <table>
                    <thead>
                        <tr>
                            <th className="th-nome">NOME</th>
                            <th className="th-data">DATA DE NASCIMENTO</th>
                            <th className="th-cpf">CPF</th>
                            <th className="th-sexo">SEXO</th>
                            <th className="th-endereco">ENDEREÇO</th>
                            <th className="th-status">STATUS</th>
                            <th className="th-editar">EDITAR</th>
                            <th className="th-inativar">INATIVAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nomeFiltrado.map((pacienteLista, index) => (
                            <Fragment key={index}>
                                                        <tr>
                                <td>{pacienteLista.nome}</td>
                                <td>{pacienteLista.dataNascimento}</td>
                                <td>{pacienteLista.cpf}</td>
                                <td>{pacienteLista.sexo}</td>
                                <td>{pacienteLista.endereco}</td>
                                <td>{pacienteLista.status}</td>
                                <td><div className="d-editar">
                                    <button type="submit" id="editar" onClick={()=>editar(index ,paciente[index])}>
                                        <FaEdit className="icon-editar" />
                                    </button>
                                </div>
                                </td>
                                <td><div className="d-inativar">
                                    <button type="submit" id="inativar" onClick={()=>inativar(index ,paciente[index])}>
                                        <FaUserSlash className="icon-inativar" />
                                    </button>                               
                                </div>
                                </td>
                            </tr>
                            </Fragment>
                        ))}
                    </tbody>

                </table>
            </div>



        </div>
    )
}

import axios from "axios";
interface Agendamento {
    _id?: string;
    day: number;
    month: number;
    year: number;
    hora: string;
    nome: string;
    servico: string;
    valor: number;
    formaPag?: string;
    idUser: string
  }
  interface Despesas {
    _id?: string;
    descricao: string;
    valor: number;
    day: number;
    month: number;
    year: number;
    idUser?: string;
  }
  interface Entradas {
    _id?: string;
    descricao: string;
    valor: number;
    day: number;
    month: number;
    year: number;
    idUser?: string;
  }

interface User {
    _id?: string;
    nome?: string;
    email: string;
    password: string;
}

const http = axios.create({
    baseURL: 'https://rich-rose-lion-cap.cyclic.app'
})

export const ReqApi = {
    getAllAgendamentos: async (_id: string) => {
        let response = await http.get(`/agendamentos/${_id}`)
        return response.data;
    },
    updateAgendamento: async (agendamento: Agendamento) => {
        let response = await http.put(`/agendamentos/update/${agendamento._id}`, agendamento)
        return response.data;
    },
    createAgendamento: async (agendamento: Agendamento) => {
        let response = await http.post(`/agendamentos/create`, agendamento);
        return response.data;
    },
    deleteAgendamento: async (_id: string) => {
        let response = await http.delete(`/agendamentos/delete/${_id}`);
        return response.data;
    },
    getAllDespesas: async (_id: string) => {
        let response = await http.get(`/despesas/${_id}`)
        return response.data;
    },
    createDespesa: async (despesa: Despesas) => {
        let response = await http.post(`/despesas/create`, despesa);
        return response.data;
    },
    deleteDespesa: async (_id: string) => {
        let response = await http.delete(`/despesas/${_id}`);
        return response.data;
    },
    getById: async (_id: string) => {
        let response = await http.get(`/agendamentos/id/${_id}`)
        console.log(response.data)
        return response.data;
    },
    verificaAcesso: async (user: User) => {
        let response = await http.post(`/users/verificaacesso`, user);
        return response.data;
    },
    cadastraUser:async (user: User) => {
        let response = await http.post('/users/create', user);
        return response.data
    },
    getUsers: async () => {
        let response = await http.get('/users/');
        return response.data;
    },
    getUserByEmail: async (email: string) => {
        let response = await http.get(`/users/email/${email}`);
        return response.data;
    },
    getAllEntradas: async (_id: string) => {
        let response = await http.get(`/entradas/${_id}`)
        return response.data;
    },
    createEntrada: async (entrada: Entradas) => {
        let response = await http.post(`/entradas/create`, entrada);
        return response.data;
    },
    deleteEntrada: async (_id: string) => {
        let response = await http.delete(`/entradas/${_id}`);
        return response.data;
    },
}
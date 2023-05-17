import axios from 'axios';
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
	idUser: string;
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

const baseURL = 'https://rich-rose-lion-cap.cyclic.app';

export const ReqApi = {
	getAllAgendamentos: async (_id: string) => {
		let response = await axios.get(`${baseURL}/agendamentos/${_id}`, {
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
		});
		return response.data;
	},
	updateAgendamento: async (agendamento: Agendamento) => {
		let response = await axios.put(
			`${baseURL}/agendamentos/update/${agendamento._id}`,
			agendamento,
			{
				headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
			}
		);
		return response.data;
	},
	createAgendamento: async (agendamento: Agendamento) => {
		let response = await axios.post(`${baseURL}/agendamentos/create`, agendamento, {
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
		});
		return response.data;
	},
	deleteAgendamento: async (_id: string) => {
		let response = await axios.delete(`${baseURL}/agendamentos/delete/${_id}`, {
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
		});
		return response.data;
	},
	getAllDespesas: async (_id: string) => {
		let response = await axios.get(`${baseURL}/despesas/${_id}`, {
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
		});
		return response.data;
	},
	createDespesa: async (despesa: Despesas) => {
		let response = await axios.post(`${baseURL}/despesas/create`, despesa, {
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
		});
		return response.data;
	},
	deleteDespesa: async (_id: string) => {
		let response = await axios.delete(`${baseURL}/despesas/${_id}`, {
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
		});
		return response.data;
	},
	getById: async (_id: string) => {
		let response = await axios.get(`${baseURL}/agendamentos/id/${_id}`, {
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
		});
		console.log(response.data);
		return response.data;
	},
	verificaAcesso: async (user: User) => {
		let response = await axios.post(`${baseURL}/users/verificaacesso`, user);
		return response.data;
	},
	cadastraUser: async (user: User) => {
		let response = await axios.post(`${baseURL}/users/create`, user);
		return response.data;
	},
	getUserByEmail: async (email: string) => {
		let response = await axios.get(`${baseURL}/users/email/${email}`);
		return response.data;
	},
	getAllEntradas: async (_id: string) => {
		let response = await axios.get(`${baseURL}/entradas/${_id}`, {
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
		});
		return response.data;
	},
	createEntrada: async (entrada: Entradas) => {
		let response = await axios.post(`${baseURL}/entradas/create`, entrada, {
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
		});
		return response.data;
	},
	deleteEntrada: async (_id: string) => {
		let response = await axios.delete(`${baseURL}/entradas/${_id}`, {
			headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
		});
		return response.data;
	},
};

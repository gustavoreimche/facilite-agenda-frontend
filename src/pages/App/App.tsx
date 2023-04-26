import { useEffect, useState } from 'react'
import React from 'react'
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container } from '../../Components/Container'
import { ReqApi } from '../../ReqApi'
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import Cabecalho from '../../Components/Cabecalho';

interface Despesas {
  _id?: string;
  descricao: string;
  valor: number;
  day: number;
  month: number;
  year: number;
  idUser?: string;
}

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

type State = {
  nome: string;
  valor: number;
  servico: string;
  hora: string
};

type StateDespesa = {
  descricao: string;
  valor: number;
};

function App() {

  const [agenda, setAgenda] = useState<Agendamento[]>([]);
  const [despesas, setDespesas] = useState<Despesas[]>([]);

  const horarios = [
    {
      id: 1,
      h: '07:00'
    },
    {
      id: 2,
      h: '07:30'
    },
    {
      id: 3,
      h: '08:00'
    },
    {
      id: 4,
      h: '08:30'
    },
    {
      id: 5,
      h: '09:00'
    },
    {
      id: 6,
      h: '09:30'
    },
    {
      id: 7,
      h: '10:00'
    },
    {
      id: 8,
      h: '10:30'
    },
    {
      id: 9,
      h: '11:00'
    },
    {
      id: 10,
      h: '11:30'
    },
    {
      id: 11,
      h: '12:00'
    },
    {
      id: 12,
      h: '12:30'
    },

    {
      id: 13,
      h: '13:00'
    },
    {
      id: 14,
      h: '13:30'
    },
    {
      id: 15,
      h: '14:00'
    },
    {
      id: 16,
      h: '14:30'
    },
    {
      id: 17,
      h: '15:00'
    },
    {
      id: 18,
      h: '15:30'
    },
    {
      id: 19,
      h: '16:00'
    },
    {
      id: 20,
      h: '16:30'
    },
    {
      id: 21,
      h: '17:00'
    },
    {
      id: 22,
      h: '17:30'
    },
    {
      id: 23,
      h: '18:00'
    },
    {
      id: 24,
      h: '18:30'
    },
    {
      id: 25,
      h: '19:00'
    },
    {
      id: 26,
      h: '19:30'
    },
    {
      id: 27,
      h: '20:00'
    },
  ]

  //df817e
  const [hardColor, setHardColor] = useState('#444')
  const [weakColor, setWeakColor] = useState('#999')
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [ID, setID] = useState('0');
  const [idUser] = useState(useAppSelector(state => state.user._id))
  const [despesasTotal, setDespesasTotal] = useState(calculaDespesaTotal(despesas));
  const [entradas, setEntradas] = useState(calculaEntradas());
  const [pix, setPix] = useState(calculaPix(agenda))
  const [card, setCard] = useState(calculaCard(agenda))
  const [money, setMoney] = useState(calculaMoney(agenda))
  const [total, setTotal] = useState(calculaTotal());
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [modalIsOpenDespesa, setIsOpenDespesa] = React.useState(false);
  const [modalIsOpenDespesas, setIsOpenDespesas] = React.useState(false);
  const [modalIsOpenTotal, setIsOpenTotal] = React.useState(false);

  const getAgendamentos = async () => {
    let data = await ReqApi.getAllAgendamentos(idUser)
    setAgenda(data)
    setPix(calculaPix(data))
    setCard(calculaCard(data))
    setMoney(calculaMoney(data))
  }

  const getDespesas = async () => {
    let data = await ReqApi.getAllDespesas(idUser)
    data.map((result: { date: Date }) => {
      result.date = new Date(result.date)
    })
    setDespesas(data)
    setPix(calculaPix(data))
    setCard(calculaCard(data))
    setMoney(calculaMoney(data))
  }

  function verificaData(obj: any) {

    return obj.day === date.getDate() && obj.month === date.getMonth() && obj.year === date.getFullYear()
  }

  function calculaDespesaTotal(temp: Despesas[]) {
    let valor: number = 0;
    temp.map(despesa => {
      if (verificaData(despesa)) {
        valor += despesa.valor
      }
    })
    return valor;
  }

  function calculaEntradas() {
    let valor: number = 0;
    agenda.map(agendamento => {
      if (verificaData(agendamento) && agendamento.formaPag !== 'none') {
        valor += agendamento.valor
      }
    })
    return valor;
  }

  function calculaTotal() {
    let entradas: number = 0;
    let despesasLocal: number = 0;
    agenda.map(agendamento => {
      if (verificaData(agendamento) && agendamento.formaPag !== 'none') {
        entradas += agendamento.valor
      }
    })

    despesas.map(despesa => {
      if (verificaData(despesa)) {
        despesasLocal += despesa.valor
      }
    })
    return entradas - despesasLocal;
  }

  function calculaPix(agendaArray: Array<Agendamento>) {
    let pix: number = 0;

    agendaArray.map(agendamento => {
      if (verificaData(agendamento) && agendamento.formaPag === 'pix') {
        pix += agendamento.valor
      }
    })
    return pix
  }

  function calculaCard(agendaArray: Array<Agendamento>) {
    let valor: number = 0;

    agendaArray.map(agendamento => {
      if (verificaData(agendamento) && agendamento.formaPag === 'card') {
        valor += agendamento.valor
      }
    })
    return valor
  }

  function calculaMoney(agendaArray: Array<Agendamento>) {
    let valor: number = 0;

    agendaArray.map(agendamento => {
      if (verificaData(agendamento) && agendamento.formaPag === 'money') {
        valor += agendamento.valor
      }
    })
    return valor
  }

  const atualiza = (dateAux: Date) => {
    setDate(dateAux);
    setAgenda(array => [...array])
    preencherArrayRender();
    setEntradas(calculaEntradas())
    setTotal(calculaTotal())
  }


  class FormCadastro extends React.Component {

    state: State = {
      nome: '',
      valor: 0,
      servico: '',
      hora: ''
    };

    // typing on RIGHT hand side of =

    onChangeNome = (e: React.FormEvent<HTMLInputElement>): void => {
      this.setState({ nome: e.currentTarget.value });
    };
    onChangeValor = (e: React.FormEvent<HTMLInputElement>): void => {
      this.setState({ valor: +(e.currentTarget.value) });
    };
    onChangeServico = (e: React.FormEvent<HTMLInputElement>): void => {
      this.setState({ servico: e.currentTarget.value });
    };

    // atualizar formulario com os valores do agendaemento selecionado


    public atulizaModal() {

      let index = agendamentosRender.findIndex(agendamento => agendamento._id === ID)
      if (index != -1) {
        if (agendamentosRender[index].nome != '') {
          this.state.nome = agendamentosRender[index].nome
          this.state.servico = agendamentosRender[index].servico
          this.state.hora = agendamentosRender[index].hora
        } else {
          this.state.hora = agendamentosRender[index].hora
        }
      }
    }

    // CADASTRA AGENDAMENTO
    private onClickAdd = async () => {

      let index = agendamentosRender.findIndex(item => item._id === ID);
      let selectedAgendamento = agenda.find(item => item._id === ID)
      let idLocal = agenda.findIndex(item => item._id === ID)
      let newAgendamento: Agendamento = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        hora: horarios[index].h,
        nome: this.state.nome,
        servico: this.state.servico,
        valor: this.state.valor,
        formaPag: 'none',
        idUser: idUser
      };
      let temp = [...agenda]

      if (selectedAgendamento) {
        if (this.state.valor === 0) {
          if (confirm('Deseja realmente prosseguir sem valor?')) {
            temp.splice(idLocal, 1)

            selectedAgendamento.valor = this.state.valor
            ReqApi.updateAgendamento(selectedAgendamento)
            temp.push(selectedAgendamento)
          } else {

          }
        } else {
          temp.splice(idLocal, 1)

          selectedAgendamento.valor = this.state.valor
          ReqApi.updateAgendamento(selectedAgendamento)
          temp.push(selectedAgendamento)
        }

      } else {
        if (this.state.valor === 0) {
          if (confirm('Deseja realmente prosseguir sem valor?')) {
            let response = ReqApi.createAgendamento(newAgendamento)
            response.then(response => {
              newAgendamento._id = response._id
            })
            temp.push(newAgendamento)
          } else {

          }
        } else {
          let response = ReqApi.createAgendamento(newAgendamento)
          response.then(response => {
            newAgendamento._id = response._id
          })
          temp.push(newAgendamento)
        }
      }
      setAgenda(temp)
      preencherArrayRender();
      setEntradas(calculaEntradas())
      setTotal(calculaTotal())
      fecharModal();
    };

    //DELETA AGENDAMENTO SELECIONADO
    onClickDelete = () => {
      let index = agendamentosRender.findIndex(item => item._id === ID)

      if (agendamentosRender[index].nome === '') {
        alert('Não há o que excluir!')
        fecharModal();
      } else {
        let r = confirm('Deseja realmente excluir o agendamento selecionado?')
        if (r) {
          ReqApi.deleteAgendamento(ID)

          let temp = (agenda.filter(item => item._id !== agendamentosRender[index]._id))
          setAgenda(agenda.filter(item => item._id !== agendamentosRender[index]._id))

          setPix(calculaPix(temp))
          setCard(calculaCard(temp))
          setMoney(calculaMoney(temp))
          setEntradas(calculaEntradas())
          setTotal(calculaTotal())
          setDate(date)
          fecharModal()
        } else {
          setIsOpen(false)
        }
      }
    }

    verificaHora = () => {
      let agendamento = agenda.find(item => item._id === ID)
      if (agendamento) {
        return agendamento.hora
      } else {
        return ''
      }
    }

    render() {

      this.atulizaModal();

      return (
        <div className='modal-area'>
          <div className='row-titulo'>
            <div className='close'>   </div>
            <div className="titulo ">{`AGENDAMENTO - ${this.state.hora}`}</div>
            <div className="close ">
              <svg onClick={fecharModal} className='svg-close' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#ffffff" ></path> </g> </g></svg>
            </div>
          </div>
          <form action="" onSubmit={this.onClickAdd}>
            <label className='label' htmlFor='nome'>Nome: </label><br />
            <input autoFocus autoComplete='off' id='nome' type="text" value={this.state.nome} required onChange={this.onChangeNome} />
            <br /><br />
            <label className='label' htmlFor='servico'>Serivço</label><br />
            <input type="text" value={this.state.servico} onChange={this.onChangeServico} />
            <br /><br />
            <label className='label' htmlFor='valor'>Valor: </label>
            <input type="number" value={this.state.valor == 0 ? '' : (this.state.valor)} onChange={this.onChangeValor} />
            <br /><br />
            <div className="div-cadastrar-button">
              <input className='cadastrar-button' type="submit" value={agenda.findIndex(item => item._id === ID) === -1 ? 'CADASTRAR' : 'ATUALIZAR'} />
              <button className='cadastrar-button excluir-button' onClick={this.onClickDelete}>EXCLUIR</button>
            </div>
          </form>
        </div>
      );
    }
  }

  class FormDespesa extends React.Component {

    state: StateDespesa = {
      descricao: '',
      valor: 0,
    };

    onChangeDescricao = (e: React.FormEvent<HTMLInputElement>): void => {
      this.setState({ descricao: e.currentTarget.value });
    };
    onChangeValor = (e: React.FormEvent<HTMLInputElement>): void => {
      this.setState({ valor: +(e.currentTarget.value) });
    };

    private onClickAdd = () => {
      let temp = despesas
      let despesa: Despesas = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        descricao: this.state.descricao,
        valor: this.state.valor,
        idUser
      }

      ReqApi.createDespesa(despesa).then(response => despesa._id = response._id)
      temp.push(despesa)

      setDespesas(temp)
      setEntradas(calculaEntradas())
      setTotal(calculaTotal())
      fecharModalDespesa();
    };

    render() {
      return (
        <div className='modal-area'>
          <div className='row-titulo'>
            <div className='grow1'>   </div>
            <div className="titulo grow1">DESPESA</div>
            <div className="close grow1">
              <svg onClick={fecharModalDespesa} className='svg-close' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#ffffff" ></path> </g> </g></svg>
            </div>
          </div>
          <form action="" onSubmit={this.onClickAdd}>
            <label className='label' htmlFor='descricao'>Descrição: </label><br />
            <input id='descricao' type="text" value={this.state.descricao} required onChange={this.onChangeDescricao} />
            <br /><br />
            <label className='label' htmlFor='valor'>Valor: </label>
            <input type="number" value={this.state.valor === 0 ? '' : (this.state.valor)} onChange={this.onChangeValor} />
            <br /><br />
            <div className="div-cadastrar-button">
              <input className='cadastrar-button' type="submit" value="CADASTRAR" />
              <div></div>
            </div>
          </form>
        </div>
      );
    }
  }



  function abrirModal(event: React.MouseEvent<HTMLButtonElement>) {
    setID(event.currentTarget.id);
    setIsOpen(true);
  }
  function abrirModalCalendar() {
    setIsOpen2(true);
  }
  function abrirModalDespesa() {
    setIsOpenDespesa(true);
  }
  function abrirModalDespesas() {
    setIsOpenDespesas(true)
  }
  function abrirModalTotal() {
    setIsOpenTotal(true)
  }
  function fecharModal() {
    setIsOpen(false);
  }
  function fecharModal2() {
    setIsOpen2(false);
  }
  function fecharModalDespesa() {
    setIsOpenDespesa(false);
  }
  function fecharModalDespesas() {
    setIsOpenDespesas(false)
  }
  function fecharModalTotal() {
    setIsOpenTotal(false)
  }



  let agendamentosRender = new Array;

  let agendamentosDay = new Array<Agendamento>

  useEffect(() => {
    getAgendamentos();
    getDespesas();
    setMoney(calculaMoney(agenda))
    setPix(calculaPix(agenda))
    setCard(calculaCard(agenda))
  }, [])

  useEffect(() => {
    setValue(value)
    setDate(value)
    setDespesasTotal(calculaDespesaTotal(despesas))
    setEntradas(calculaEntradas())
    setTotal(calculaTotal())
    setMoney(calculaMoney(agenda))
    setPix(calculaPix(agenda))
    setCard(calculaCard(agenda))
  }, [value, date, despesasTotal, total, pix, card, money, entradas])

  function atualizaAgendamentosDay() {
    agendamentosDay = [];
    agenda.map((agendamento) => {
      if (verificaData(agendamento)) {
        agendamentosDay.push(agendamento);
      }
    })
  }

  function preencherArrayRender() {
    atualizaAgendamentosDay();
    agendamentosRender = [];
    let temp = [];

    for (let index = 0; index < horarios.length; index++) {

      agendamentosDay.map((agendamento) => {
        if (agendamento.hora === horarios[index].h) {
          temp.push(agendamento)
          agendamentosRender.push(agendamento)
        }
      })

      if (temp.length == 0) {
        let agendamentoDefault: Agendamento = {
          _id: `${index}`,
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          hora: horarios[index].h,
          nome: '',
          servico: '',
          valor: 0,
          formaPag: 'none',
          idUser: ''
        }
        agendamentosRender.push(agendamentoDefault)
      }

      temp = [];
    }
  }
  preencherArrayRender();

  function onClickDay(clickedDay: Date) {
    setDate(clickedDay);
    setValue(clickedDay)
    preencherArrayRender();
    setAgenda(array => [...array])
    setEntradas(calculaEntradas())
    setTotal(calculaTotal())
    fecharModal2();
  }

  function excluirDespesa(event: React.MouseEvent<HTMLButtonElement>) {
    let tempDespesas = [...despesas]
    let index = +event.currentTarget.id

    let r = confirm('Deseja realmente excluir a despesa selecionada?')
    if (r) {
      ReqApi.deleteDespesa(event.currentTarget.id)
      tempDespesas.splice(index, 1)
      setDespesas(tempDespesas)
      setDespesasTotal(calculaDespesaTotal(tempDespesas))
    }

  }

  function checkedPix(event: React.ChangeEvent<HTMLElement>) {
    let index = event.target.id;
    let agendamentos = [...agenda];
    agendamentos.map(agendamento => {
      if (agendamento._id === index) {
        if (agendamento.formaPag === 'pix') {
          agendamento.formaPag = 'none';
          ReqApi.updateAgendamento(agendamento)
        } else {
          agendamento.formaPag = 'pix';
          ReqApi.updateAgendamento(agendamento)
        }
      }
    })
    setPix(calculaPix(agenda))
    setCard(calculaCard(agenda))
    setMoney(calculaMoney(agenda))
    setAgenda(agendamentos)
  }


  function checkedCard(event: React.ChangeEvent<HTMLElement>) {
    let index = event.target.id;
    let agendamentos = [...agenda];
    agendamentos.map(agendamento => {
      if (agendamento._id === index) {
        if (agendamento.formaPag === 'card') {
          agendamento.formaPag = 'none';
          ReqApi.updateAgendamento(agendamento)
        } else {
          agendamento.formaPag = 'card';
          ReqApi.updateAgendamento(agendamento)
        }
      }
    })
    setPix(calculaPix(agenda))
    setMoney(calculaMoney(agenda))
    setCard(calculaCard(agenda))
    setAgenda(agendamentos)
  }

  function checkedMoney(event: React.ChangeEvent<HTMLElement>) {
    let index = event.target.id;
    let agendamentos = [...agenda];
    agendamentos.map(agendamento => {
      if (agendamento._id === index) {
        if (agendamento.formaPag === 'money') {
          agendamento.formaPag = 'none';
          ReqApi.updateAgendamento(agendamento)
        } else {
          agendamento.formaPag = 'money';
          ReqApi.updateAgendamento(agendamento)
        }
      }
    })
    setPix(calculaPix(agenda))
    setCard(calculaCard(agenda))
    setMoney(calculaMoney(agenda))
    setAgenda(agendamentos)
  }

  function getDiasMes(month: number, year: number) {
    month--;

    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  function reduceAgenda(day: number) {
    return agenda.reduce((acumulator, currentValue) => {
      return (currentValue.day == day && currentValue.month == date.getMonth() && currentValue.formaPag !== 'none') ? acumulator + currentValue.valor : acumulator
    }, 0)
  }
  function reduceDespesa(day: number) {
    return despesas.reduce((acumulator, currentValue) => {
      return (currentValue.day == day && currentValue.month == date.getMonth()) ? acumulator + currentValue.valor : acumulator
    }, 0)
  }


  return (
    <>
      <Container hardColor={hardColor} weakColor={weakColor}>
        <div>
          <Cabecalho abrirModal={abrirModalCalendar} date={date} hardColor={hardColor} atualiza={atualiza} />

          <Modal
            style={{
              content: {
                backgroundColor: hardColor,
              }
            }}
            isOpen={modalIsOpen}
            onRequestClose={fecharModal}
            ariaHideApp={false}
            appElement={document.getElementById('#root') || undefined}
            contentLabel="Modal de exemplo"
            className="modal"
            overlayClassName="modal-overlay"
            closeTimeoutMS={200}

          >
            <FormCadastro />
          </Modal>

          <Modal
            style={{
              content: {
                backgroundColor: hardColor,
              }
            }}
            isOpen={modalIsOpen2}
            onRequestClose={fecharModal2}
            appElement={document.getElementById('#root') || undefined}
            ariaHideApp={false}
            contentLabel="Modal de exemplo"
            className="modal2"
            overlayClassName="modal-overlay"
            closeTimeoutMS={200}
          >
            <Calendar onClickDay={onClickDay} onChange={() => setValue} value={value} />
          </Modal>

          <Modal
            style={{
              content: {
                backgroundColor: hardColor,
              }
            }}
            isOpen={modalIsOpenDespesa}
            appElement={document.getElementById('#root') || undefined}
            onRequestClose={fecharModalDespesa}
            ariaHideApp={false}
            contentLabel="Modal de exemplo"
            className="modal-despesa"
            overlayClassName="modal-overlay"
            closeTimeoutMS={200}
          >
            <FormDespesa />
          </Modal>

          <Modal
            style={{
              content: {
                backgroundColor: hardColor,
              }
            }}
            isOpen={modalIsOpenDespesas}
            onRequestClose={fecharModalDespesas}
            appElement={document.getElementById('#root') || undefined}
            ariaHideApp={false}
            contentLabel="Modal de exemplo"
            className="modal-despesas"
            overlayClassName="modal-overlay"
            closeTimeoutMS={200}
          >
            <div className="area-despesas">
              <div className="row-title">
                <div className="descricao-despesa">
                  DESCRIÇÃO
                </div>
                <div className="valor-despesa">
                  VALOR
                </div>
                <div className="data-despesa">
                  DATA
                </div>
                <div className="excluir">

                </div>
              </div>
              <div className="body-despesa">

                {
                  despesas.map((despesa, index) => (
                    despesa.month == date.getMonth() ?
                      <div className="row-despesa" key={index}>
                        <div className="descricao-despesa">
                          {despesa.descricao}
                        </div>
                        <div className="valor-despesa">
                          {`R$ ${despesa.valor.toFixed(2)}`}
                        </div>
                        <div className="data-despesa">
                          {`${despesa.day.toString().padStart(2, '0')}/${(despesa.month + 1).toString().padStart(2, '0')}/${despesa.year}`}
                        </div>
                        <div className="excluir">
                          <button className='button-excluir-despesa' id={`${despesa._id}`} onClick={excluirDespesa}>
                            <svg className="excluir" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><path d="M4.99997 8H6.5M6.5 8V18C6.5 19.1046 7.39543 20 8.5 20H15.5C16.6046 20 17.5 19.1046 17.5 18V8M6.5 8H17.5M17.5 8H19M9 5H15M9.99997 11.5V16.5M14 11.5V16.5" stroke="#b71010" ></path></g></svg>
                          </button>
                        </div>
                      </div>
                      : null
                  )
                  )
                }
              </div>
            </div>
          </Modal>

          <Modal
            style={{
              content: {
                backgroundColor: hardColor,
              }
            }}
            isOpen={modalIsOpenTotal}
            onRequestClose={fecharModalTotal}
            appElement={document.getElementById('#root') || undefined}
            ariaHideApp={false}
            contentLabel="Modal de exemplo"
            className="modal-despesas"
            overlayClassName="modal-overlay"
            closeTimeoutMS={200}
          >
            <div className="area-despesas">
              <div className="title-total">
                <div className="row-title-total">
                  <div className="data-total">
                    DATA
                  </div>
                  <div className="entradas-total">
                    ENTRADAS
                  </div>
                  <div className="despesas-total">
                    DESPESAS
                  </div>
                  <div className="total-total">
                    TOTAL
                  </div>
                </div>
              </div>
              <div className="body-despesa">

                {
                  getDiasMes(date.getMonth(), date.getFullYear()).map(el => (
                    < div className="row-title-total" >
                      <div className="data-total">
                        {`${el.toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`}
                      </div>
                      <div className="entradas-total">
                        {
                          reduceAgenda(el) === 0 ? "" : <><span className='span-rs'>R$ </span><span className='span-valor'>{reduceAgenda(el).toFixed(2)}</span></>
                        }
                      </div>
                      <div className="despesas-total">
                        {
                          reduceDespesa(el) === 0 ? "" : <><span className='span-rs'>R$ </span><span className='span-valor'>{reduceDespesa(el).toFixed(2)}</span></>
                        }
                      </div>
                      <div className="total-total">
                        {
                          (reduceAgenda(el) - reduceDespesa(el)) === 0 ? '' : <><span className='span-rs'>R$ </span><span className='span-valor'>{(reduceAgenda(el) - reduceDespesa(el)).toFixed(2)}</span></>
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

          </Modal>

          <div className="header">
            <div className="row">
              <div className="col-hora hora">

              </div>
              <div className="col-nome">
                CLIENTE
              </div>
              <svg className="separator" fill={hardColor} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="16"></circle> </g></svg>
              <div className="col-service">
                SERVIÇO
              </div>
              <svg className="separator" fill={hardColor} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="16"></circle> </g></svg>
              <div className="col-price">
                PREÇO
              </div>
              <div className="col-pag">
                <div className='row-pag'>
                  <svg className="svg-pag" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs /><g fill="white"><path d="M112.57 391.19c20.056 0 38.928-7.808 53.12-22l76.693-76.692c5.385-5.404 14.765-5.384 20.15 0l76.989 76.989c14.191 14.172 33.045 21.98 53.12 21.98h15.098l-97.138 97.139c-30.326 30.344-79.505 30.344-109.85 0l-97.415-97.416h9.232zm280.068-271.294c-20.056 0-38.929 7.809-53.12 22l-76.97 76.99c-5.551 5.53-14.6 5.568-20.15-.02l-76.711-76.693c-14.192-14.191-33.046-21.999-53.12-21.999h-9.234l97.416-97.416c30.344-30.344 79.523-30.344 109.867 0l97.138 97.138h-15.116z" /><path d="M22.758 200.753l58.024-58.024h31.787c13.84 0 27.384 5.605 37.172 15.394l76.694 76.693c7.178 7.179 16.596 10.768 26.033 10.768 9.417 0 18.854-3.59 26.014-10.75l76.989-76.99c9.787-9.787 23.331-15.393 37.171-15.393h37.654l58.3 58.302c30.343 30.344 30.343 79.523 0 109.867l-58.3 58.303H392.64c-13.84 0-27.384-5.605-37.171-15.394l-76.97-76.99c-13.914-13.894-38.172-13.894-52.066.02l-76.694 76.674c-9.788 9.788-23.332 15.413-37.172 15.413H80.782L22.758 310.62c-30.344-30.345-30.344-79.524 0-109.868" /></g></svg>
                  <svg className="svg-pag" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"> <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" /> <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" /> </svg>
                  <svg className="svg-pag-money" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M512 64C547.3 64 576 92.65 576 128V384C576 419.3 547.3 448 512 448H64C28.65 448 0 419.3 0 384V128C0 92.65 28.65 64 64 64H512zM272 192C263.2 192 256 199.2 256 208C256 216.8 263.2 224 272 224H496C504.8 224 512 216.8 512 208C512 199.2 504.8 192 496 192H272zM272 320H496C504.8 320 512 312.8 512 304C512 295.2 504.8 288 496 288H272C263.2 288 256 295.2 256 304C256 312.8 263.2 320 272 320zM164.1 160C164.1 148.9 155.1 139.9 143.1 139.9C132.9 139.9 123.9 148.9 123.9 160V166C118.3 167.2 112.1 168.9 108 171.1C93.06 177.9 80.07 190.5 76.91 208.8C75.14 219 76.08 228.9 80.32 237.8C84.47 246.6 91 252.8 97.63 257.3C109.2 265.2 124.5 269.8 136.2 273.3L138.4 273.9C152.4 278.2 161.8 281.3 167.7 285.6C170.2 287.4 171.1 288.8 171.4 289.7C171.8 290.5 172.4 292.3 171.7 296.3C171.1 299.8 169.2 302.8 163.7 305.1C157.6 307.7 147.7 309 134.9 307C128.9 306 118.2 302.4 108.7 299.2C106.5 298.4 104.3 297.7 102.3 297C91.84 293.5 80.51 299.2 77.02 309.7C73.53 320.2 79.2 331.5 89.68 334.1C90.89 335.4 92.39 335.9 94.11 336.5C101.1 339.2 114.4 343.4 123.9 345.6V352C123.9 363.1 132.9 372.1 143.1 372.1C155.1 372.1 164.1 363.1 164.1 352V346.5C169.4 345.5 174.6 343.1 179.4 341.9C195.2 335.2 207.8 322.2 211.1 303.2C212.9 292.8 212.1 282.8 208.1 273.7C204.2 264.7 197.9 258.1 191.2 253.3C179.1 244.4 162.9 239.6 150.8 235.9L149.1 235.7C135.8 231.4 126.2 228.4 120.1 224.2C117.5 222.4 116.7 221.2 116.5 220.7C116.3 220.3 115.7 219.1 116.3 215.7C116.7 213.7 118.2 210.4 124.5 207.6C130.1 204.7 140.9 203.1 153.1 204.1C157.5 205.7 171 208.3 174.9 209.3C185.5 212.2 196.5 205.8 199.3 195.1C202.2 184.5 195.8 173.5 185.1 170.7C180.7 169.5 170.7 167.5 164.1 166.3L164.1 160z" fill="white"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="body">
            {
              agendamentosRender.map((agendamento, index) => (
                <div className="row" key={index} id={`row${index}`}>
                  <div className="col-hora">
                    {agendamento.hora}
                  </div>
                  <div className="col-nome">
                    <button id={`${agendamento._id}`} onClick={abrirModal}>{agendamento.nome}</button>
                  </div>
                  <div className='separator-div'>
                    <svg className="separator" fill={hardColor} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="16"></circle> </g></svg>
                  </div>
                  <div className="col-service">
                    {agendamento.servico}
                  </div>
                  <div className='separator-div'>
                    <svg className="separator" fill={hardColor} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="16"></circle> </g></svg>
                  </div>
                  <div className="col-price">
                    {agendamento.valor == 0 ? '' : `R$ ${agendamento.valor.toFixed(2).toString().replace('.', ',')}`}
                  </div>
                  <div className="row-pag">
                    <label className="chk">
                      <input className="radio" type="checkbox" checked={agendamento.formaPag == 'pix'} onChange={checkedPix} name="pix" id={`${agendamento._id}`} />
                      <span></span>
                    </label>

                    <label className="chk">
                      <input className="radio" type="checkbox" checked={agendamento.formaPag == 'card'} onChange={checkedCard} name="card" id={`${agendamento._id}`} />
                      <span></span>
                    </label>

                    <label className="chk">
                      <input className="radio" type="checkbox" checked={agendamento.formaPag == 'money'} onChange={checkedMoney} name="money" id={`${agendamento._id}`} />
                      <span></span>
                    </label>
                  </div>
                </div>
              )
              )
            }
          </div>

          <div className="total">
            <div className="pag-pix">
              <label htmlFor="" className="total-label">
                PIX:
              </label>
              <div className="total-valor">
                {`R$ ${pix.toFixed(2)}`}
              </div>
            </div>
            <div className="pag-card">
              <label htmlFor="" className="total-label">
                CARTÃO:
              </label>
              <div className="total-valor">
                {`R$ ${card.toFixed(2)}`}
              </div>
            </div>
            <div className="pag-money">
              <label htmlFor="" className="total-label">
                DINHEIRO:
              </label>
              <div className="total-valor">
                {`R$ ${money.toFixed(2)}`}
              </div>
            </div>
          </div>

          <div className="footer">
            <div className="entradas">
              <label htmlFor="" className="entradas-label">
                ENTRADAS:
              </label>
              <div className="valor-entradas">
                {`R$ ${entradas.toFixed(2)}`}
              </div>
            </div>
            <div className="despesas">
              <label className="despesas-label" onClick={abrirModalDespesas}>
                DESPESAS:
              </label>
              <div className="despesas-valor" onClick={abrirModalDespesa}>
                {`R$ ${despesasTotal.toFixed(2)}`}
              </div>
            </div>
            <div className="despesas">
              <label htmlFor="" className="total-label" onClick={abrirModalTotal}>
                TOTAL:
              </label>
              <div className="despesas-valor">
                {`R$ ${total.toFixed(2)}`}
              </div>
            </div>

          </div>
        </div >
      </Container >
    </>
  )
}

export default App
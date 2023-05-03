import { useForm, SubmitHandler } from "react-hook-form";
import { Agendamento } from "../pages/App/App";

type Inputs = {
    nome: string,
    servico: string,
    valor: number,
};

type Props = {
    agendamento: Agendamento;
    fecharModal: () => void;
    onClickAdd: (nome: string, servico: string, valor: number) => void
    onClickDelete: () => void
}

export default function FormCadastro({ agendamento, fecharModal, onClickAdd, onClickDelete }: Props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        if(+data.valor === 0) {
            if(confirm('Deseja prosseguir sem valor?')) {
                onClickAdd(data.nome, data.servico, +data.valor)
                fecharModal()
            } 
        } else {
            onClickAdd(data.nome, data.servico, +data.valor);
            fecharModal()
        }
    }

    return (
        <div className='modal-area'>
            <div className='row-titulo'>
                <div className='close'>   </div>
                <div className="titulo ">{`AGENDAMENTO - ${agendamento?.hora}`}</div>
                <div className="close ">
                    <svg onClick={fecharModal} className='svg-close' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#ffffff" ></path> </g> </g></svg>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className='label' htmlFor='nome'>Nome: </label>{errors.nome && <span>This field is required</span>}
                <br />
                <input autoFocus type="text" {...register("nome", { required: true })} defaultValue={agendamento?.nome} />
                <br /><br />

                <label className='label' htmlFor='servico'>Serivço: </label>{errors.servico && <span>This field is required</span>}
                <br />
                <input type="text" {...register("servico", { required: true })} defaultValue={agendamento?.servico} />
                <br /><br />

                <label className='label' htmlFor='valor'>Valor: </label>
                <br />
                <input type="number" {...register("valor")} />
                <br /><br />

                <div className="div-cadastrar-button">
                    <input className='cadastrar-button' type="submit" value={agendamento?.nome === '' ? 'CADASTRAR' : 'ATUALIZAR'}/>
                    <button className='cadastrar-button excluir-button' type="button" onClick={onClickDelete}>EXCLUIR</button>
                </div>
            </form>
        </div>
    );
}

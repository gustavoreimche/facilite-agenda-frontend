import AccountMenu from "./AccountMenu";

type Props = {
    date: Date;
    atualiza: (dateaux: Date) => void;
    hardColor: string;
    abrirModal: () => void;
}

const weekday = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

const Cabecalho = ({ date, atualiza, abrirModal, hardColor }: Props) => {
    
    
    const minusDay = () => {
        
        let dateaux = date
        dateaux.setDate(dateaux.getDate() - 1);
        atualiza(dateaux)
        
    }
    
    const addDay = () => {
        
        let dateaux = date
        dateaux.setDate(dateaux.getDate() + 1);
        atualiza(dateaux)
    }

    return (
        <div className="title">
            <div className="mes-semana">
                <h2 className="month">{month[date.getMonth()]}</h2>
                <h4 className="week">{weekday[date.getDay()]}</h4>
            </div>
            <div className="dias">
                <svg onClick={minusDay} viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill={hardColor}><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><path d="M659.2 917.333333l66.133333-66.133333L386.133333 512 725.333333 172.8 659.2 106.666667 256 512z" fill={hardColor}></path></g></svg>
                <h1 onClick={abrirModal} className="day">{date.getDate()}</h1>
                <svg onClick={addDay} viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill={hardColor}><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"><path d="M364.8 106.666667L298.666667 172.8 637.866667 512 298.666667 851.2l66.133333 66.133333L768 512z" fill={hardColor}></path></g></svg>
            </div>
            <div className="menu">
                <AccountMenu hardColor={hardColor} />
            </div>
        </div>
    )

}

export default Cabecalho
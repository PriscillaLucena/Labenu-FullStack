import axios from "axios";
import React from "react";

export default class WatchPL extends React.Component {

    state = {
        resultado: [],
        valorInputName: "",
        valorInputArtista: "",
        valorInputURL: "",
    }

    // componentDidMount () {
    //     this.encontraPL()
    // }    
    //funções controle de imput//

    onChangeValorName = (event) => {
        this.setState({ valorInputName: event.target.value })
    }

    onChangeValorArtista = (event) => {
        this.setState({ valorInputArtista: event.target.value })
    }

    onChangeValorURL = (event) => {
        this.setState({ valorInputURL: event.target.value })
    }


    //função add musica//

    addTrack = async (playlistId) => {

        const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlistId}/tracks`

        const body = {
            name: this.state.valorInputName,
            artist: this.state.valorInputArtista,
            url: this.state.valorInputURL,
        }

        try {
            const response = await axios.post(url, body, {
                headers: {
                    Authorization: "priscilla-lucena-hopper"
                }
            })
            this.setState({ valorInputName: "" })
            this.setState({ valorInputArtista: "" })
            this.setState({ valorInputURL: "" })
            alert('Música Adicionada com sucesso!')
        } catch (error) {
            console.log(error.response)
            alert("Erro: Não foi possível adicionar Música")
        }

    }

    // //imprime pl na tela//

    // encontraPL = async () => {

    //     const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`

    //     try {
    //         const response = await axios.get(url, {
    //             headers: {
    //                 Authorization: "priscilla-lucena-hopper"
    //             }
    //         })
    //         this.setState({ resultado: response.result})
    //         console.log(response)
    //     } catch (error) {
    //         console.log(error.response)
    //     }
    // }


   

    render () {

    const listaResultado = this.state.resultado.map((pl) => {
        return  <div>   
            {pl.nome} 
            <button onChange={()=>this.addTrack(pl.playlistId)}>Escolher</button>
            </div>}
        )

        return(
         <div>
                 <h3>Add track</h3>
                
                <div>

                {this.listaResultado}

                <input
                    value={this.state.valorInputName}
                    onChange={this.onChangeValorName}
                    placeholder='digite nome da Música'
                 ></input>

                <input
                     value={this.state.valorInputArtista}
                     onChange={this.onChangeValorArtista}
                     placeholder='digite nome do Artista'>
                </input>

                <input
                    value={this.state.valorInputURL}
                    onChange={this.onChangeValorURL}
                    placeholder='digite URL da Música'
                 ></input>

                <button onClick={() => this.addTrack()}>Adicionar</button>
                </div>
        </div >
        )
    }
}
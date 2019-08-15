import React, {Component} from 'react'
import axios from 'axios'

import Main from '../templates/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: inclui, lista, altera e exclui'
}

const baseUrl = 'http://localhost:3001/users'
const initiaState = {
    user: { name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {

    state = { ... initiaState}

    clear(){
        this.setState({ user: initiaState.user })
    }
    save(){
        const user = this.state.user
        const method = user.id ? 'put'/*true*/ : 'post' //false !!0 = false, !!1 = true, !!166 = true, !1000 = true
        // se existir usuario será diferente de zero , ou seja put, senão será zero , sendo entao post
        const url = user.id ? `${baseUrl}/${user.id}` /*se o id estiver setado*/ : baseUrl
        axios[method](url,user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initiaState.user, list })
            })
    }
    getUpdatedList(user){
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }

    updateField(event) {
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm(){
        return (
            <div className="form">

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                            name="name"
                            value={this.state.user.name}
                            onChange={e => this.updateField(e)}
                            placeholde="digite o nome"
                            />   
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="">E-mail</label>
                            <input type="text"  className="form-control"
                            name="email"
                            value={this.state.user.email}
                            onChange={e => this.updateField(e)}
                            placeholde="digite o email"
                            />
                        </div>
                    </div>
                </div>

                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" 
                        onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" 
                        onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>

            </div>
        )
    }
    
    render(){
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}
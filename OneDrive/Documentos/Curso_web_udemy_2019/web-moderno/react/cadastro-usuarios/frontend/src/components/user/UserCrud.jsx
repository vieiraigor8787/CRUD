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
    
    render(){
        return (
            <Main {...headerProps}>
                Usuário
            </Main>
        )
    }
}
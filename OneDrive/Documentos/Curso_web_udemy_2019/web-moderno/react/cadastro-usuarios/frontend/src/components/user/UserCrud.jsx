import React, {Component} from 'react'
import Main from '../templates/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: inclui, lista, altera e exclui'
}

export default class UserCrud extends Component {
    render(){
        return (
            <Main {...headerProps}>
                Usuário
            </Main>
        )
    }
}
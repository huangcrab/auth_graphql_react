import React, { useState } from 'react'
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';

export const Login: React.FC<RouteComponentProps> = ({history}) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [login] = useLoginMutation();

const onSubmitClick = async (e : any) => {
    e.preventDefault();
    console.log("Form Submitted");
    const response = await login({
        variables: {
            email,
            password
        },
        update: (store, {data}) => {
            if(!data){
                return null;
            }
            store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                    __typename: 'Query',
                    me: data.login.user
                }
            })
        }
    })
    
    if(response && response.data){
        setAccessToken(response.data.login.accessToken);
    }

    history.push('/');
}

return (
    <form onSubmit={onSubmitClick}>
        <input value={email} placeholder="email" onChange={e => setEmail(e.target.value)} type="text"/>
        <br/>
        <input value={password} placeholder="password" onChange={e => setPassword(e.target.value)} type="password"/>
        <br/>
        <button type="submit">Login</button>
    </form>
)
}

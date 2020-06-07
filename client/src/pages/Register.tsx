import React, { useState } from 'react'
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

export const Register: React.FC<RouteComponentProps> = ({history}) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [register] = useRegisterMutation();

const onSubmitClick = async (e : any) => {
    e.preventDefault();
    console.log("Form Submitted");
    const response = await register({
        variables: {
            email,
            password
        }
    })
    history.push('/');
    console.log(response);
}

return (
    <form onSubmit={onSubmitClick}>
        <input value={email} placeholder="email" onChange={e => setEmail(e.target.value)} type="text"/>
        <br/>
        <input value={password} placeholder="password" onChange={e => setPassword(e.target.value)} type="password"/>
        <br/>
        <button type="submit">Register</button>
    </form>
)
}

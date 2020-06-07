import React from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery, useLoginMutation, useLogoutMutation } from './generated/graphql'
import { setAccessToken } from './accessToken';

export const Header = () => {
    const {data, loading} = useMeQuery();
    const [logout, {client}] = useLogoutMutation();

    let body:any = null;

    if(loading) {
        body = null;
    } else if(data && data.me){
        body = <div>You are logged in as {data.me.email}</div>
    } else {
        body = <div>You are not logged in</div>
    }

    const onClickLogout = async () => {
        await logout();
        setAccessToken("");
        await client!.resetStore();
    }

    const loggedIn = () => (!loading && data && data.me);

    return (
    <header>
        <div>
            <Link to='/'>Home</Link>
        </div>
        <div>
            <Link to='/register'>Register</Link>
        </div>
        <div>
            <Link to='/login'>Login</Link>
        </div>
        <div>
            <Link to='/bye'>Bye</Link>
        </div>
        <div>
            {loggedIn() 
            ? <button onClick={onClickLogout}>Logout</button> 
            : null}
        </div>
    {body}
    </header>
    )
}

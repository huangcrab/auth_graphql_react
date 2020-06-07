import React from 'react';
import { useByeQuery } from '../generated/graphql';

export const Bye = () => {
    const {data, loading, error} = useByeQuery()

    if(loading){
        return <div>Loading...</div>
    }

    if(error) {
        console.log(error);
        return <div>Error</div>
    }

    if(!data) {
        return <div>No Data</div>
    }

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

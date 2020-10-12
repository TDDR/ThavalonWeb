import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AccountManager from '../utils/accountManager';
import { log_out } from '../utils/account_utils';

function Logout() {
    const accountManager = AccountManager.getInstance();
    accountManager.logOut();

    return (
        <Redirect to="/" />
    )
}


export default Logout;
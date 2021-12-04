import React, {FC, useContext} from "react";
import "./style.scss";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const Header: FC = () => {
    const {store} = useContext(Context)

    const handleLogout = (e: any) => {
        e.preventDefault()
        store.logout()
    }


    return (
        <div className="header">
            <div className="leftContainer">
                <img className="logo" src="/img/comp2.svg" alt=""/>
                <div className="name">Monitoring System</div>
            </div>
            <div className="rightContainer">
                <div className="userName">{store.isAuth ? store.User.name : ''} </div>
                <div className="logoutButton" onClick={handleLogout}>{store.isAuth ? 'Выйти' : ''}</div>
            </div>
        </div>
    )
}

export default observer(Header)
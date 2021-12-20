import React, {ReactElement, useEffect} from "react";
import {FC} from "react";
import "./style.scss";
import {Images} from "../../models/ImageConst";

interface MessagesWindowProps {
    visible: boolean
    content: String[]
    onClose: () => void
}

const MessagesWindow:FC<MessagesWindowProps> = ({
                                                    visible = false,
                                                    content = [],
                                                    onClose
                                                }) => {
    const onKeydown = ({key}: KeyboardEvent) => {
        switch (key) {
            case 'Escape':
                onClose()
                break
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    if (!visible) return null
    return (
        <div className='messages-window'>
            <div className='messages-window-dialog'>
                <div id="messages-form">
                    <h1>Список сообщений</h1>
                    <fieldset>
                        {content.map((message, index: number)=>{
                            return(
                                <div className="listItem" key={index} data-index={index}>
                                    <img className="stateIcon" src={Images.ERROR} alt=""/> {message}
                                </div>
                            )
                        })}
                    </fieldset>
                </div>
            </div>
        </div>

    )
}
export default MessagesWindow
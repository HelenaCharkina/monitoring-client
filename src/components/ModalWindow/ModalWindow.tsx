import React from "react";
import {FC, ReactElement, useEffect} from "react";
import "./style.scss"
// интерфейс для пропсов
interface ModalProps {
    visible: boolean
    title: ReactElement | string
    content: ReactElement | string
    footer: ReactElement | string
    onClose: () => void
}

const Modal: FC<ModalProps> = ({
                                   visible = false,
                                   title = '',
                                   content = '',
                                   footer = '',
                                   onClose
                               }) => {


    // создаем обработчик нажатия клавиши Esc
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

    // если компонент невидим, то не отображаем его
    if (!visible) return null

    // или возвращаем верстку модального окна
    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h3 className='modal-title'>{title}</h3>
                    <span className='modal-close' onClick={onClose}>
            &times;
          </span>
                </div>
                <div className='modal-body'>
                    <div className='modal-content'>{content}</div>
                </div>
                {footer && <div className='modal-footer'>{footer}</div>}
            </div>
        </div>
    )
}

export default Modal;
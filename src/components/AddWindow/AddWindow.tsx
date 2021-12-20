import React, {useEffect, useState} from "react";
import "./style.scss"
import Agent from "../../models/agent";
import AgentService from "../../services/AgentService";

interface ModalProps {
    visible: boolean
    onClose: () => void
}

const AddWindow = ({
                       visible = false,
                       onClose,
                   }: ModalProps) => {

    const empty = {description: "", id: "", ip: "", name: "", port: "", schedule: "", state: 0}

    const [currentAgent, setCurrentAgent] = useState<Agent>(empty)

    const onKeydown = ({key}: KeyboardEvent) => {
        switch (key) {
            case 'Escape':
                onClose()
                break
        }
    }

    const save = () => {
        addAgent()
    }

    async function addAgent(): Promise<void> {
        try {
            await AgentService.add(currentAgent)
        } catch (e) {
            console.log(e)
        }finally {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    if (!visible) return null

    return (
        <div className='add-window'>
            <div className='add-window-dialog'>
                <div id="add-form">
                    <h1>Создание агента</h1>
                    <fieldset>
                        <form>
                            <input type="text" value={currentAgent.ip} required placeholder="Хост"
                                   onChange={e => setCurrentAgent({...currentAgent, ip: e.target.value})}/>

                            <input type="text" value={currentAgent.port} required placeholder="Порт"
                                   onChange={e => setCurrentAgent({...currentAgent, port: e.target.value})}/>

                            <input type="text" value={currentAgent.name} required placeholder="Название"
                                   onChange={e => setCurrentAgent({...currentAgent, name: e.target.value})}/>

                            <input type="text" value={currentAgent.schedule} required placeholder="Интервал опроса"
                                   onChange={e => setCurrentAgent({...currentAgent, schedule: e.target.value})}/>

                            <input type="text" value={currentAgent.description} required placeholder="Описание"
                                   onChange={e => setCurrentAgent({
                                       ...currentAgent,
                                       description: e.target.value
                                   })}/>

                            <input type="submit" value="Сохранить" readOnly onClick={save}/>
                        </form>
                    </fieldset>
                </div>
            </div>
        </div>

    )
}

export default AddWindow
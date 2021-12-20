import * as React from "react";
import {FC, useEffect, useState} from "react";
import "./style.scss";
import Agent from "../../models/agent";
import AgentService from "../../services/AgentService";
import AgentWindow from '../AgentWindow/AgentWindow'
import {DISPATCHER_ADDRESS} from "../../settings";
import Modal from "../ModalWindow/ModalWindow";
import {Images} from "../../models/ImageConst";
import AddWindow from "../AddWindow/AddWindow";
import MessagesWindow from "../MessagesWindow/MessagesWindow";


const socket = new WebSocket("ws://" + DISPATCHER_ADDRESS + "/ws");

const MainPage: FC = () => {
    let msgArray: String[] = []
    const [messages, setMessages] = useState<String[]>([])
    const [agents, setAgents] = useState<Agent[]>([])
    const [currentAgent, setCurrentAgent] = useState<Agent>(null)
    const [isAgentWindowOpen, setIsAgentWindowOpen] = useState<boolean>(false)

    const [isModal, setModal] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const onClose = () => setModal(false)

    const [isMessagesWindow, setIsMessagesWindow] = useState<boolean>(false)
    const onCloseMessagesWindow = () => setIsMessagesWindow(false)

    const [isAddWindow, setAddWindow] = React.useState(false)
    const onCloseAddWindow = () => { // todo на эскейп убрать перезагрузку
        setAddWindow(false)
        getAgents()
    }

    const onAgentChange = () => {
        getAgents()
    }

    useEffect(() => {
        socket.onopen = () => {
            console.log('Connected')
        };

        socket.onmessage = (e) => {
            let message = (JSON.parse(e.data)).Message
            msgArray.push(message)
            setMessages(msgArray)
            setError(message)
            setModal(true)
            setTimeout(onClose, 3000)
            getAgents()
        };

        return () => {
            socket.close()
        }
    }, [])

    useEffect(() => {
        getAgents()
    }, [])

    async function getAgents(): Promise<void> {
        try {
            const agents = await AgentService.getAll()
            setAgents(agents)
        } catch (e) {
            console.log(e)
        }
    }

    const showAgentInfo = (e: any) => {
        let idx = +e.currentTarget.getAttribute('data-index');
        let agent = agents[idx]
        setCurrentAgent(agent)
        setIsAgentWindowOpen(true)
    }

    const handleAdd = (e: any) => {
        e.preventDefault()
        setAddWindow(true)
    }

    const handleMessages = (e: any) => {
        e.preventDefault()
        setIsMessagesWindow(true)
    }

    return (
        <div className="generalContainer">
            <div className="agentsList">
                <table>
                    <thead>
                    <tr>
                        <th>Состояние</th>
                        <th>Название</th>
                        <th>IP адрес</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        agents.map((agent: Agent, index: number) => {
                            let state
                            switch (agent.state) {
                                case 1:
                                    state = <span className='sphere yellow'/>
                                    break
                                case 2:
                                    state = <span className='sphere green'/>
                                    break
                                case 3:
                                    state = <img className="stateIcon" src={Images.ERROR} alt=""/>
                                    break
                                default:
                                    state = <img className="stateIcon" src={Images.UNKNOWN} alt=""/>
                                    break
                            }
                            return (
                                <tr key={index} data-index={index} onClick={showAgentInfo}>
                                    <td className="iconCell">
                                        {state}
                                    </td>
                                    <td>{agent.name}</td>
                                    <td>{agent.ip}:{agent.port}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <input className="addButton" type="submit" value="Добавить" readOnly onClick={handleAdd}/>
            </div>
            <div className="agentMainContainer">
                <input className="messagesButton" type="submit" value="Сообщения" readOnly onClick={handleMessages}/>
                {(isAgentWindowOpen && <AgentWindow agent={currentAgent} onChange={onAgentChange}/>)}
            </div>

            <Modal
                visible={isModal}
                title={<img className="stateIcon" src={Images.ERROR} alt=""/>}
                content={<p>{error}</p>}
                footer={null}
                onClose={onClose}
            />
            <AddWindow
                visible={isAddWindow}
                onClose={onCloseAddWindow}
            />
            <MessagesWindow
                visible={isMessagesWindow}
                content={messages}
                onClose={onCloseMessagesWindow}
            />
        </div>

    )
}


export default MainPage;

import * as React from "react";
import {FC, useEffect, useState} from "react";
import "./style.scss";
import Agent from "../../models/agent";
import AgentService from "../../services/AgentService";

const MainPage: FC = () => {

    const [agents, setAgents] = useState<Agent[]>([])

    useEffect(() => {
        console.log("get agents")
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

    const addAgent = (e: any) => {
        console.log("add!!")
    }

    function switchState(state: number) {
        console.log("switch!!")
    }

    return (
        <div className="generalContainer">
            <div className="leftPanel">
                <img className="panelIcon" src="/img/plus.png" alt="" onClick={addAgent}/>
            </div>
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
                        agents.map((agent: Agent) => {
                            let state
                            switch (agent.state) {
                                case 1:
                                    state  = <img className="stateIcon" src="/img/yellow.png" alt=""/>
                                    break
                                case 2:
                                    state  = <img className="stateIcon" src="/img/green.png" alt=""/>
                                    break
                                case 3:
                                    state  = <img className="stateIcon" src="/img/red.png" alt=""/>
                                    break
                            }
                            return(
                            <tr key={agent.id}>
                                <td>
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

            </div>
        </div>
    )
}


export default MainPage;

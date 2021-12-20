import * as React from "react";
import {FC, useEffect, useState} from "react";
import Agent from "../../models/agent";
import "./style.scss";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import StatisticService from "../../services/StatisticService";
import DatetimePicker from "../DatetimePicker/DatetimePicker";
import SelectList from "../SelectList/SelectList";
import Statistics from "../../api/response/StatisticsResponse";
import moment from "moment";
import AgentService from "../../services/AgentService";
import Modal from "../ModalWindow/ModalWindow";
import {Images} from "../../models/ImageConst";
import ReactTooltip from "react-tooltip";
import {AgentState} from "../../models/AgentState";

interface AgentWindowProps {
    agent: Agent
    onChange: () => void
}


const AgentWindow: FC<AgentWindowProps> = ({agent, onChange}) => {

    useEffect(() => {
        setCurrentAgent(agent)
        setStatistics([])
    }, [agent])

    const [statistics, setStatistics] = useState<Statistics[]>([])
    const [startDate, setStartDate] = useState<Date>(new Date())
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [interval, setInterval] = useState<number>(1)

    const [isModal, setModal] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const onClose = () => setModal(false)
    const [modalIcon, setModalIcon] = useState<string>('')

    const empty = {description: "", id: "", ip: "", name: "", port: "", schedule: "", state: 0}


    async function getStats(): Promise<void> {
        try {
            let request = {
                agent_id: agent.id,
                start_time: startDate,
                end_time: endDate,
                interval: interval,
            }
            const stats = await StatisticService.getStatistics(request)
            if (stats) {
                stats.map((s: Statistics) => {
                    s.format_vm_used_percent = Math.round(s.vm_used_percent)
                    s.format_cpu_percentage = Math.round(s.cpu_percentage)
                    s.format_datetime = moment(s.datetime).format('DD.MM.YYYY HH:mm')
                })
            }

            setStatistics(stats)
        } catch (e) {
            console.log(e)
        }
    }

    const handleShow = (e: any) => {
        e.preventDefault()
        getStats()
    }

    const save = () => {
        updateAgent()
    }
    const start = () => {
        if (currentAgent.state === AgentState.STARTED) {
            console.log("Агент уже запущен")
            return
        }
        startAgent()
    }
    const stop = () => {
        if (currentAgent.state === AgentState.STOPPED) {
            console.log("Агент уже остановлен")
            return
        }
        stopAgent()
    }
    const drop = () => {
        dropAgent()
    }

    const [currentAgent, setCurrentAgent] = useState<Agent>(agent)

    async function updateAgent(): Promise<void> {
        try {
            await AgentService.update(currentAgent)
            setMessage("Обновление прошло успешно")
            setModalIcon(Images.OK)
            setModal(true)
        } catch (e) {
            console.log(e)
            setMessage("Произошла ошибка при обновлении: " + e.error)
            setModalIcon(Images.ERROR)
            setModal(true)
        } finally {
            onChange()
        }
    }

    async function dropAgent(): Promise<void> {
        try {
            await AgentService.drop(currentAgent.id)
            setMessage("Удаление прошло успешно")
            setModalIcon(Images.OK)
            setModal(true)
        } catch (e) {
            console.log(e)
            setMessage("Произошла ошибка при удалении: " + e.error)
            setModalIcon(Images.ERROR)
            setModal(true)
        } finally {
            onChange()
            setCurrentAgent(empty)
        }
    }

    async function startAgent(): Promise<void> {
        try {
            await AgentService.start(currentAgent.id)
            let agent = currentAgent
            agent.state = AgentState.STARTED
            setCurrentAgent(agent)
        } catch (e) {
            console.log(e)
        } finally {
            onChange()
        }
    }

    async function stopAgent(): Promise<void> {
        try {
            await AgentService.stop(currentAgent.id)
            let agent = currentAgent
            agent.state = AgentState.STOPPED
            setCurrentAgent(agent)
        } catch (e) {
            console.log(e)
        } finally {
            onChange()
        }
    }

    return (

        <div className="agentContainer">
            <div className="agentInfo">
                <div>
                    <label className="label">Хост:
                        <input className="host" type="text" value={currentAgent.ip}
                               onChange={e => setCurrentAgent({...currentAgent, ip: e.target.value})}/>
                    </label>
                    <label className="label">Порт:
                        <input className="port" type="text" value={currentAgent.port}
                               onChange={e => setCurrentAgent({...currentAgent, port: e.target.value})}/>
                    </label>
                    <label className="label">Название:
                        <input className="name" type="text" value={currentAgent.name}
                               onChange={e => setCurrentAgent({...currentAgent, name: e.target.value})}/>
                    </label>
                    <label className="label">Интервал опроса:
                        <input className="interval" type="text" value={currentAgent.schedule}
                               onChange={e => setCurrentAgent({...currentAgent, name: e.target.value})}/>
                    </label>
                </div>
                <div className="menu">
                    <img className="stateIcon" src={Images.OK} alt="" onClick={save} data-tip data-for="saveTip"/>
                    <img className="stateIcon" src={Images.START} alt="" onClick={start} data-tip data-for="startTip"/>
                    <img className="stateIcon" src={Images.STOP} alt="" onClick={stop} data-tip data-for="stopTip"/>
                    <img className="stateIcon" src={Images.DELETE} alt="" onClick={drop} data-tip data-for="deleteTip"/>
                </div>
            </div>
            <div className="agentDescription">
                <label className="label">Описание:
                    <input className="description" type="text" value={currentAgent.description}
                           onChange={e => setCurrentAgent({...currentAgent, description: e.target.value})}/>
                </label>
            </div>
            <div className="statistic">
                <div className="filters">
                    <DatetimePicker label="С" value={startDate} onChange={setStartDate}/>
                    <DatetimePicker label="По" value={endDate} onChange={setEndDate}/>
                    <SelectList value={interval} onChange={setInterval}/>
                    <input className="showButton" type="submit" value="Показать" readOnly onClick={handleShow}/>
                </div>
                <div className="data">
                    <LineChart
                        width={650}
                        height={400}
                        data={statistics}
                        margin={{top: 5, right: 20, left: 10, bottom: 5}}
                    >
                        <XAxis dataKey="format_datetime"/>
                        <YAxis type="number" domain={[0, 100]}/>
                        <Legend/>
                        <Tooltip/>
                        <CartesianGrid stroke="#f5f5f5"/>
                        <Line type="monotone" dataKey="format_vm_used_percent" name="RAM" stroke="#ff7300" dot={false}/>
                        <Line type="monotone" dataKey="format_cpu_percentage" name="ЦП" stroke="#387908" dot={false}/>
                    </LineChart>
                    <div className="infoContainer">
                        <div className="entity">
                            <div className="label">Место на диске</div>
                            <div className="entityInfo">
                                <div className="data">
                                    <div className="dataItem">Всего:</div>
                                    <div className="dataItem">Свободно:</div>
                                    <div className="dataItem">Занято системой:</div>
                                    <div className="dataItem">Процент использования:</div>
                                </div>
                                {(statistics && statistics.length > 0 &&
                                    <div className="stats">
                                        <div className="dataItem"> {statistics[statistics.length-1].disk_total} мб</div>
                                        <div className="dataItem"> {statistics[statistics.length-1].disk_free} мб</div>
                                        <div className="dataItem"> {statistics[statistics.length-1].disk_used} мб</div>
                                        <div className="dataItem"> {Math.round(statistics[statistics.length-1].disk_used_percent)} %</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="entity">
                            <div className="label">Информация о хосте</div>
                            <div className="entityInfo">
                                <div className="data">
                                    <div className="dataItem">ОС:</div>
                                    <div className="dataItem">Платформа:</div>
                                    <div className="dataItem">Версия платформы:</div>
                                    <div className="dataItem">Процессы:</div>
                                </div>
                                {(statistics && statistics.length > 0 &&
                                    <div className="stats">
                                        <div className="dataItem"> {statistics[statistics.length-1].os} </div>
                                        <div className="dataItem"> {statistics[statistics.length-1].platform} </div>
                                        <div className="dataItem"> {statistics[statistics.length-1].platform_version} </div>
                                        <div className="dataItem"> {Math.round(statistics[statistics.length-1].host_procs)} </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="entity">
                            <div className="label">Информация о процессоре</div>
                            <div className="entityInfo">
                                <div className="data">
                                    <div className="dataItem">Модель:</div>
                                    <div className="dataItem">Количество ядер:</div>
                                </div>
                                {(statistics && statistics.length > 0 &&
                                    <div className="stats">
                                        <div className="dataItem"> {statistics[statistics.length-1].model} </div>
                                        <div className="dataItem"> {statistics[statistics.length-1].cores} </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                visible={isModal}
                title={<img className="stateIcon" src={modalIcon} alt=""/>}
                content={<p>{message}</p>}
                footer={null}
                onClose={onClose}
            />

            <ReactTooltip id="saveTip" place="top" effect="solid">
                Сохранить изменения
            </ReactTooltip>
            <ReactTooltip id="startTip" place="top" effect="solid">
                Запустить агента
            </ReactTooltip>
            <ReactTooltip id="stopTip" place="top" effect="solid">
                Остановить агента
            </ReactTooltip>
            <ReactTooltip id="deleteTip" place="top" effect="solid">
                Удалить агента
            </ReactTooltip>
        </div>

    );

}

export default AgentWindow;

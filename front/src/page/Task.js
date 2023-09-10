import { useEffect, useState } from "react"
import NewTaskForm from "../components/NewTaskForm"
import TaskCard from "../components/TaskCard"
import { Container, Row, Col } from 'react-grid-system'
import UserLogin from "./User"
import authService from "../authHandler/AuthHandle"
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import StartOutlinedIcon from '@mui/icons-material/StartOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';

const TaskPage = () => {
    const [newTask, setNewTask] = useState(false)
    const [ cards, setCards ] = useState('')
    const [trigger, setTrigger] = useState(false)
    const [c,setC] = useState(true)

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch('/tasks')
            const json = await res.json()
            setTrigger(true)

            if(res.ok) {
                setCards(json)
            }
            console.log('798653', cards)
        }
        if(authService.getUser) {
            setC(false)
        }
        fetchTasks()
    }, [trigger])

    return(
        c? <UserLogin/> : <div className="taskpage">
            <Container Container spacing={2} className="taskcase">
                <Row>
                    <Col sm={4}>
                        <div className="taskForm">
                        <h2>To Do</h2>
                            <button onClick={(e) => {setNewTask(!newTask)}} className="newtask"><h1>+</h1></button>
                            { newTask && <NewTaskForm/>};
                        </div>
                        <div className="todos" >
                            { cards && cards.map(card => {
                                if(card.status === 1 ) {
                                    return <TaskCard task={card} stat={<PlayArrowOutlinedIcon/>} key={card._id}/>
                                } 
                            }) }
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="onits">
                            <h2><HourglassTopOutlinedIcon/>   On-It</h2>
                            { cards && cards.map(card => {
                                if(card.status === 2) {
                                    return <TaskCard task={card} stat={<StartOutlinedIcon/>} key={card._id}/>
                                }
                            }) }
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="dones">
                            <h2><SportsScoreOutlinedIcon/> Done!</h2>
                            { cards && cards.map(card => {
                                if (card.status === 3) {
                                    return <TaskCard task={card} stat={<DoneAllOutlinedIcon/>} key={card._id}/>
                                }
                            }) }
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TaskPage
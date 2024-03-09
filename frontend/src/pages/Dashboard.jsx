import React from "react";
import GetGraphData from "../components/Graph/GetGraphData";
import { Button, HrtLn, ProtectedRoute, Question } from "../components";
import {Task} from "../components";
import { useState, useEffect } from "react";
import { apiBase } from "../constants";
import { useNavigate } from 'react-router-dom'
import { TbWindowMaximize } from "react-icons/tb";
import { UserAuth } from "../context/AuthContext";
import { diffInDays } from "../utils/ToDo";
import { ColorRing } from 'react-loader-spinner'

const Dashboard = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState(null)
  const [questions,setQuestions] = useState(null)
  const {auth} = UserAuth()

  useEffect(() => {
    const fetchLatestQuestion = async () => {
      await fetch(`${apiBase}/api/questions`,{
        method:'GET',
      }).then(res => res.json()).then(data => {
        const questions_ = data.slice(0,2)
        setQuestions(questions_)
      })
    }
    const fetchTodo = async () => {
        console.log(`auth ${auth._id}`)
        await fetch(`${apiBase}/api/todo`,{
          method:'GET',
          headers:{
            authorization: JSON.stringify(auth)
          }
        }).then(res => res.json()).then(data => {
          const tasks = data.slice(0,5)
          console.log(tasks)
          setTasks(tasks)
        })
    }
    fetchTodo()
    fetchLatestQuestion()
  },[])

  return (
    <ProtectedRoute>
      <div className="container mt-4 px-2">
        <h2 className="text-4xl mb-2 bg-clip-text bg-gradient text-transparent w-2/12 max-xl:w-full font-[500]">Dashboard</h2>
        <HrtLn/>
        <div className="flex justify-between w-full py-6 gap-4 max-md:flex-col max-md:px-2">
          <div className="w-8/12 max-md:w-full">
            <GetGraphData />
          </div>
          <div className="w-4/12 flex flex-col max-md:w-full gap-2">
          <Button text='Manage Your Profile' variant='gradient' handleClick={() => navigate('/profile')}
                    rightIcon={<TbWindowMaximize/>}/>
            <div className="bg-gradient rounded-xl p-[1px] flex w-full">
              <div className="bg-zinc-900 rounded-xl p-2 flex flex-col gap-2 w-full">
                <h3 className="text-[24px] bg-gradient bg-clip-text text-transparent font-[500] text-center">Recent Questions</h3>
                  {questions ? 
                    questions.map((question) => (
                      <div key={question._id}>
                        <Question question={question}/>
                      </div>
                    )) : (
                      <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={['#5b21b6', '#681faa', '#721da1','#761c9e', '#86198f']}
                    />
                  )}
              </div>
            </div>
            <div className="max-md:w-full bg-gradient rounded-xl p-[1px] flex w-full">
              <div className="bg-zinc-900 rounded-xl p-2 flex flex-col gap-2 w-full">
                <h3 className="text-[24px] bg-gradient bg-clip-text text-transparent font-[500] text-center">Tasks Due Soon</h3>
                  {tasks ? 
                    tasks?.map((task) => (
                      <Task key={task._id} task={task} deadline={diffInDays(new Date(task?.deadline))}/>
                    )
                  ) : (
                    <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#5b21b6', '#681faa', '#721da1','#761c9e', '#86198f']}
                  />
                  )}
                <div className="p-1">
                  <Button text='Manage Todo List' variant='gradient' handleClick={() => navigate('/todo')}
                    rightIcon={<TbWindowMaximize/>}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

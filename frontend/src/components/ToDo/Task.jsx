import { genDeadline } from "../../utils/ToDo";
import Button from "../Button";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";

const Task = ({task,deadline,deleteTask,editTask}) => {
  const statusBg = () => {
    const remDays = deadline.substring(0,2).trim()
    if (task.completed) return 'bg-green-400'
    if (remDays <=3  && remDays >=0) return 'bg-yellow-400'
    return isNaN(remDays) && !task.completed ? 'bg-[#d15252]' : 'bg-black'
  }

  return (
  <div className={`p-[2px] w-full rounded-md ${statusBg()}`}>
    <div className={`flex bg-zinc-950 rounded-md p-2 max-md:flex-col bg-opacity-85`}>
      {deleteTask && (
            <div className="flex flex-col w-1/12 max-md:w-full self-center">
              <input type="checkbox"/>
            </div>
      )}
      <div className="flex flex-col w-8/12 max-md:w-full">
        <h5 className="text-md font-[500] w-full">{task?.taskName}</h5>
        <p className="text-sm">{task?.taskDesc}</p>
      </div>
      <div className="flex flex-col w-4/12 max-md:w-full text-right">
        <p className="text-sm">Deadline: {genDeadline(task?.deadline)}</p>
        <p className="text-sm">{deadline}</p>
        {deleteTask && (
          <div className="flex justify-end pt-[4px] gap-2">
            {/* {!task.completed && <Button handleClick="" rightIcon={<FaCheck/>} variant="check"/>} */}
            <Button handleClick={() => deleteTask(task._id)} variant="delete" rightIcon={<MdDelete/>}/>
            <Button handleClick={() => editTask(task)} variant="edit" rightIcon={<FiEdit/>}/>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default Task;
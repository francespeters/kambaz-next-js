import { IoAdd, IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoAdd className="fs-4 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div> );}
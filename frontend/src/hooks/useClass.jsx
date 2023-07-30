import { useContext } from "react";
import ClassContext from "../context/ClassContext";

const useClass = () => useContext(ClassContext)

export default useClass
import { 
    createContext, useState, useEffect
} from "react"

import { classes } from "../data/classes"

const ClassContext = createContext()

export const ClassProvider = ({ children }) => {

    const [classNames, setClassNames] = useState([])

    useEffect(() => {
        classList()
    }, [])

    const classList = () => {
        setClassNames(classes.map((item) => item.name))
    }

  //  console.log(classNames)

    return (
        <ClassContext.Provider
            value={{
                classes,
                classNames
            }}
        >
            { children }
        </ClassContext.Provider>
    )
}

export default ClassContext
import {React} from "react";
import { format } from 'date-fns';//For adequate date formating, otherwise it shows one day less

const ReadRowResults = ({calcResponse}) => {
    return(
        <tr key={calcResponse.userPass.userPassId}>
            <td>{calcResponse.user.email}</td>
            <td>{calcResponse.passType.name}</td>
            <td>{format(new Date(calcResponse.userPass.purchase), "yyy-MM-dd")}</td>
            <td>{format(new Date(calcResponse.estimatedEndDate), "yyy-MM-dd")}</td>
            <td>{calcResponse.estimatedRemainingPasses}</td>
        </tr>
    )
}

export default ReadRowResults
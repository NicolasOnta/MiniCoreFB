import {React} from "react";
import { format } from 'date-fns';

const ReadRowResults = (calcResponse) => {
    console.log(calcResponse);
    return(
        <tr key={calcResponse.calcResponse.userPass.userPassId}>
            <td>{calcResponse.calcResponse.user.mail}</td>
            <td>{calcResponse.calcResponse.passTypes.name}</td>
            <td>{format(new Date(calcResponse.calcResponse.userPass.purchase.seconds*1000), "yyy-MM-dd")}</td>
            <td>{format(new Date(calcResponse.calcResponse.estimatedEndDate), "yyy-MM-dd")}</td>
            <td>{calcResponse.calcResponse.estimatedRemainingPasses}</td>
        </tr>
    )
}

export default ReadRowResults
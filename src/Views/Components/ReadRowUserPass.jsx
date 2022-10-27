import {React} from "react";
import { format } from 'date-fns';//For adequate date formating, otherwise it shows one day less

const ReadRowUserPass = ({userPass, users, passTypes}) => {
    return(
        <tr key={userPass.userPassId}>
            <td>{userPass.userPassId}</td>
            <td>{users.find(user => user.userId == userPass.userId).email}</td>
            <td>{passTypes.find(passType => passType.passTypeId == userPass.passTypeId).name}</td>
            <td>{format(new Date(userPass.purchase), "yyy-MM-dd")}</td>
        </tr>
    )
}

export default ReadRowUserPass
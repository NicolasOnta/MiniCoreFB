import {React} from "react";
import { format } from 'date-fns';

const ReadRowUserPass = ({userPass, users, passTypes}) => {
    return(
        <tr key={userPass.userPassId}>
            <td>{userPass.userPassId}</td>
            <td>{users.find(user => user.userId == userPass.userId).email}</td>
            <td>{passTypes.find(passType => passType.passtypeId == userPass.passTypeId).name}</td>
            <td>{format(new Date(userPass.purchase.seconds*1000), "yyy-MM-dd")}</td>
        </tr>
    )
}

export default ReadRowUserPass
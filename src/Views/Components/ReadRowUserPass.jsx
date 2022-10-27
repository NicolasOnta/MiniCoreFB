import {React} from "react";
import { format,add, differenceInMonths } from 'date-fns';//For adequate date formating, otherwise it shows one day less

const ReadRowUserPass = ({userPass, users, passTypes}) => {
    const today = new Date();
    console.log(differenceInMonths(today,new Date(userPass.purchase.seconds*1000)));
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
import "./BirthdayList.scss"
import {months} from "../../utils/constants";

export function BirthdayList({birthdayUsersList}) {

  const formattedDate = (date) => {
      return `${new Date(date).getDate()} ${months[new Date(date).getMonth()]}, ${new Date(date).getFullYear()} year`
    },

    renderBirthdayUsers = () => {

      return Object.entries(birthdayUsersList).map(([month, users]) => {

        return (
          <div className="birthday-list__item" key={month}>
            <div className="birthday-list__month">{month}:</div>
            {
              !users.length ?

                <div className="birthday-list__content">
                  No Employees
                </div>
                :
                users.map((user) => (
                  <ul key={user.id} className="birthday-list__content">
                    <li className="birthday-list__item-name">
                      {user.firstName} {user.lastName} - {formattedDate(user.dob)}
                    </li>
                  </ul>

                ))
            }
          </div>
        )
      });
    };

  return (
    <div className="birthday-list custom-scroll">
      {renderBirthdayUsers()}
    </div>
  );


};

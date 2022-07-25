import "./UsersList.scss"
import {RRadioBtn} from "../common/RRadioBtn";

export function UsersList({alphabetUsersList, setIsActiveToggle}) {

  const renderUsers = () => {

    return Object.entries(alphabetUsersList).map(([letter, users]) => {



      return (
        <div className="users-list__item" key={letter}>
          <div className="users-list__item-letter">{letter}:</div>
          {
            !users.length ? `No Employees` :

              users.map((user) => (
                <div key={user.id} className="users-list__item">
                  <div className="users-list__item-name">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="users-list__item-btns">
                    <RRadioBtn
                      label={'active'}
                      checked={user.isActive}
                      onChange={() => setIsActiveToggle(user.id)}
                    />
                    <RRadioBtn
                      label={'not active'}
                      checked={!user.isActive}
                      onChange={() => setIsActiveToggle(user.id)}
                    />
                  </div>
                </div>
              ))
          }
        </div>
      )
    });
  };

  return (
    <div className=" users-list custom-scroll">
      {renderUsers()}
    </div>
  );
};

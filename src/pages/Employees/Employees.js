import "./Employees.scss"
import {useEffect, useState} from "react";
import {UsersList} from "../../components/UsersList/UserList";
import {BirthdayList} from "../../components/BirthdayList/BirthdayList";
import {alphabet, months} from "../../utils/constants";


function Employees() {

  const [users, setUsers] = useState([]);
  const [ids, setIds] = useState(JSON.parse(localStorage.getItem("ids") || "[]"));


  let alphabetUsersList = {}

  for (let i = 0; i < alphabet.length; i++) {

    alphabetUsersList[alphabet[i]] = [];

    for (let j = 0; j < users.length; j++) {

      if (users[j].letterAlphabet === alphabet[i]) {
        const currentUsersList = alphabetUsersList[alphabet[i]];
        alphabetUsersList[alphabet[i]] = [...currentUsersList, users[j]];
        alphabetUsersList[alphabet[i]].sort((a, b) => a.firstName > b.firstName ? 1 : -1);
      }
    }
  }


  let birthdayUsersList = {}
  const _users = users.filter((user) => ids.includes(user.id))
  for (let i = 0; i < months.length; i++) {
    birthdayUsersList[months[i]] = [];
    for (let j = 0; j < _users.length; j++) {
      if (months[_users[j].month] === months[i]) {
        const currentUsersList = birthdayUsersList[months[i]];
        birthdayUsersList[months[i]] = [...currentUsersList, _users[j]];
        birthdayUsersList[months[i]].sort((a, b) => a.firstName > b.firstName ? 1 : -1);
      }
    }
  }

  const setIsActiveToggle = (userId) => {

    setUsers(prevState => {
      return prevState.map(user => {
        if (user.id === userId) {
          return {...user, isActive: !user.isActive}
        }
        return user
      })
    })

    const listIds = ids.includes(userId) ? ids.filter(id => id !== userId) : [...ids, userId]
    setIds(listIds)
  }


  useEffect(() => {
    fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users')
      .then(async res => {
        const data = await res.json()

        const users = data.map((user) => {
          user = {
            ...user,
            letterAlphabet: user.firstName.charAt(0),
            month: new Date(user.dob).getMonth(),
          }
          user["isActive"] = Boolean(ids.includes(user.id));
          return (user)

        })

        setUsers(users)
      })
  }, []);

  useEffect(() => {
    localStorage.setItem("ids", JSON.stringify(ids))
  }, [ids]);


  return (

    <div className="employees">
      <div className="employees__container">
        <div className="employees__col">
          <h2 className="employees__title">Employees:</h2>
          <UsersList
            alphabetUsersList={alphabetUsersList}
            setIsActiveToggle={setIsActiveToggle}
          />
        </div>
        <div className="employees__col">
          <h2 className="employees__title">Employees birthday:</h2>
          <BirthdayList birthdayUsersList={birthdayUsersList} />
        </div>
      </div>
    </div>
  );
};


export default Employees;
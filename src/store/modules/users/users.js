import api from "@/api";
import {requestStatus, months} from '@/utils/constants';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export default {
  namespaced: true,
  state: {
    users: [],
    fetchingStatus: requestStatus.IDLE,
    ids: JSON.parse(localStorage.getItem("ids")) || []
  },

  getters: {
    alphabetUsersList: s => {
      let alphabetUsersList = {}

      for (let i = 0; i < alphabet.length; i++) {

        alphabetUsersList[alphabet[i]] = []

        for (let j = 0; j < s.users.length; j++) {

          if (s.users[j].letterAlphabet === alphabet[i]) {
            const currentUsersList = alphabetUsersList[alphabet[i]];
            alphabetUsersList[alphabet[i]] = [...currentUsersList, s.users[j]]
            alphabetUsersList[alphabet[i]].sort((a, b) => a.firstName > b.firstName ? 1 : -1);
          }
        }
      }
      return alphabetUsersList
    },

    usersBirthday: s => {

      let usersBirthday = {}
      const users = s.users.filter((user) => s.ids.includes(user.id))

      for (let i = 0; i < months.length; i++) {
        usersBirthday[months[i]] = []

        for (let j = 0; j < users.length; j++) {

          if (months[users[j].month] === months[i]) {
            const currentUsersBirthday = usersBirthday[months[i]];
            usersBirthday[months[i]] = [...currentUsersBirthday, users[j]]
            usersBirthday[months[i]].sort((a, b) => a.firstName > b.firstName ? 1 : -1);
          }
        }
      }
      return usersBirthday
    },

  },

  mutations: {
    SET_USERS: (s, data) => {
      s.users = data.map((user) => {
        user = {
          ...user,
          letterAlphabet: user.firstName.charAt(0),
          month: new Date(user.dob).getMonth(),
        }
        if (s.ids.includes(user.id)) user["isActive"] = true
        else user["isActive"] = false
        return user;
      })
    },

    SET_IS_ACTIVE_TOGGLE: (s, userId) => {
      const user = s.users.find((user) => user.id === userId)
      user.isActive = !user.isActive

      if (s.ids.includes(userId)) {
        s.ids = s.ids.filter(id => id !== userId)
      } else {
        s.ids.push(userId)
      }
      localStorage.setItem("ids", JSON.stringify(s.ids))
    },
  },

  actions: {
    async setUsers({state, commit}) {
      state.fetchingStatus = requestStatus.PENDING;
      try {
        const data = await api.users.setUsers();
        commit('SET_USERS', data.data)
        state.fetchingStatus = requestStatus.SUCCESS;
      } catch (e) {
        state.fetchingStatus = requestStatus.FAIL;
        throw e;
      }
    }

  }
}
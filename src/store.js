import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    studentList: []
  },
  mutations: {
    addToStudentList(state, payload) {
      state.studentList.push(payload);
    },
    deleteFromStudentList(state, id) {
      state.studentList.splice(state.studentList.findIndex(student => student.id === id), 1)
    },
    updateStudent(state, student) {
      const studentId = student.id
      state.studentList.splice(state.studentList.findIndex(student => student.id === studentId), 1, student)
    },
  },
  getters: {
    students: state => state.studentList
  }
})
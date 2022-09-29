import $api from "./index";

const usersAPI = {
    getUsers: async (usersRole) => {
        return $api.get(`/users?role=${usersRole}`)
    }
}

export default usersAPI
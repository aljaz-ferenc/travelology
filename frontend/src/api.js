const URL = 'http://localhost:10000/api/v1'
// const URL = import.meta.env.VITE_APP_URL 

export async function registerUser(data) {

    const user = {
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm
    }

    try {
        const res = await fetch(`${URL}/users`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        return await res.json()

    } catch (err) {
        return err
    }
}

export async function loginUser(data) {

    const user = {
        email: data.email,
        password: data.password
    }

    try {
        const res = await fetch(`${URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        return await res.json()

    } catch (err) {
        return err
    }
}

export async function authenticate() {
    try {
        const res = await fetch(`${URL}/auth/verify`, {
            method: 'POST',
            credentials: 'include'
        })

        return await res.json()

    } catch (err) {
        return err
    }
}

export async function getTrips() {
    try {
        const res = await fetch(`${URL}/users/userId/trips`, {
            method: 'GET',
            credentials: 'include'
        })
        return await res.json()
    } catch (err) {
        return err
    }
}

export async function createTrip(trip) {
    try {
        const res = await fetch(`${URL}/trips`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(trip),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await res.json()
    } catch (err) {
        return err
    }
}

export async function getUser() {
    try {
        const res = await fetch(`${URL}/users/userId`, {
            method: 'GET',
            credentials: 'include'
        })
        return await res.json()
    } catch (err) {
        return err
    }
}

export async function updateUser(data) {
    try {
        const res = await fetch(`${URL}/users/userId`, {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await res.json()
    } catch (err) {
        return err
    }
}

export async function logoutUser() {
    try {
        const res = await fetch(`${URL}/auth/logout`, {
            method: 'GET',
            credentials: 'include'
        })
        return await res.json()
    } catch (err) {
        return err
    }
}

export async function changePassword(oldPass, newPass) {
    const body = { oldPass, newPass }

    try {
        const res = await fetch(`${URL}/users/userId/password`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return await res.json()
    } catch (err) {
        return err
    }
}

export async function deleteUser(password) {
    try {
        const res = await fetch(`${URL}/users/userId`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        })
        return await res.json()
    } catch (err) {
        return err
    }
}

export async function updateTrip(id, title) {
    const body = { id, title }
    try {
        const res = await fetch(`${URL}/trips/tripId`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return await res.json()
    } catch (err) {
        return err
    }
}

export async function deleteTrip(id) {

    try {
        const res = await fetch(`${URL}/trips/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return await res.json()
    } catch (err) {
        return err
    }
}

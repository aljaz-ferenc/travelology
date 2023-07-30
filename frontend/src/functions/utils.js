import { getUser } from "../api";

export function formatDate(date) {
    const dateFormatter = Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    })

    return dateFormatter.format(new Date(date)).replaceAll('/', '. ')
}

export function getBrowserPosition() {
    let coords = []
    navigator.geolocation.getCurrentPosition((pos) => {
        coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
        };
    });
    return coords
}


export async function getTheme() {
    const res = await getUser()
    if (res.status === 'success') {
        return res.data.theme
    }
}
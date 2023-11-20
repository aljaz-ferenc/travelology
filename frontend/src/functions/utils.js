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

export function setThemeColors(theme){
    if(theme === 'dark'){
        document.documentElement.style.setProperty('--color-primary', 'rgb(12, 19, 27)')
        document.documentElement.style.setProperty('--color-secondary', 'rgb(25, 34, 48)')
        document.documentElement.style.setProperty('--color-accent', 'rgb(67, 61, 223)')
        document.documentElement.style.setProperty('--color-error', 'rgb(244, 69, 69)')
        document.documentElement.style.setProperty('--color-text', '#fff')
        document.documentElement.style.setProperty('--color-icons', '#fff')
      }
      if(theme === 'light'){
        document.documentElement.style.setProperty('--color-secondary', 'rgb(249, 249, 249)')
        document.documentElement.style.setProperty('--color-primary', 'rgb(240, 239, 239)')
        document.documentElement.style.setProperty('--color-accent', 'rgb(230, 79, 59)')
        document.documentElement.style.setProperty('--color-error', 'rgb(217, 87, 87)')
        document.documentElement.style.setProperty('--color-text', '#313131')
        document.documentElement.style.setProperty('--color-icons', 'rgb(211, 211, 211)')
      }
      if(theme === 'blue'){
        document.documentElement.style.setProperty('--color-secondary', 'rgb(55, 67, 128)')
        document.documentElement.style.setProperty('--color-primary', 'rgb(32, 37, 74)')
        document.documentElement.style.setProperty('--color-accent', 'rgb(44, 223, 146)')
        document.documentElement.style.setProperty('--color-error', 'rgb(217, 87, 87)')
        document.documentElement.style.setProperty('--color-text', '#ffffff')
        document.documentElement.style.setProperty('--color-icons', 'rgb(138, 183, 237)')
      }
}
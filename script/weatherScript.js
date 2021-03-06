const apiKey = '4154b83dc3fae98323d99f1e62f85872'

document
    .querySelectorAll('.js--weatherButton')
    .forEach((button) =>
        button.addEventListener('click', (e) =>
            getWeatherData(e.target.innerText).then(renderWeatherModal, showErrorModal)
        )
    )

async function getWeatherData(cityName) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    ).then(
        (response) => response.json(),
        () => Promise.reject('Check your internet connection and try again')
    )
}

function showErrorModal(message) {
    openModal('errorModal')

    let errorModal = document.getElementById('errorModal')
    errorModal.innerText = message
}

function renderWeatherModal(weatherData) {
    openModal('singleCityWeatherModal')

    let iconElement = document.getElementById('weatherIcon')
    let descriptionElement = document.getElementById('description')
    let temperatureElement = document.getElementById('temperature')
    let feelsLikeTemperatureElement = document.getElementById('feelsLikeTemperature')
    let windElement = document.getElementById('wind')
    let locationElement = document.getElementById('location')

    iconElement.setAttribute('src', `../weather-icons/${weatherData.weather[0].icon}.png`)
    descriptionElement.innerText = `${weatherData.weather[0].description}`
    temperatureElement.innerText = `Temperature: ${formatTemperatureData(weatherData, 'temp')}`
    feelsLikeTemperatureElement.innerText = `Feels Like: ${formatTemperatureData(
        weatherData,
        'feels_like'
    )}`
    windElement.innerText = `Wind: ${formatWindData(weatherData)}`
    locationElement.innerText = `${weatherData.name}`
}

function formatTemperatureData(weatherData, property) {
    return `${Number(weatherData.main[property] - 273.15).toFixed(0)} °C`
}

function formatWindData(weatherData) {
    let degrees = weatherData.wind.deg
    let windSpeed = Number(weatherData.wind.speed).toFixed(1)

    if (degrees > 337.5 || degrees <= 22.5) return `← ${windSpeed} m/s`
    if (degrees <= 67.5) return `↙ ${windSpeed} m/s`
    if (degrees <= 112.5) return `↓ ${windSpeed} m/s`
    if (degrees <= 157.5) return `↘ ${windSpeed} m/s`
    if (degrees <= 202.5) return `→ ${windSpeed} m/s`
    if (degrees <= 247.5) return `↗ ${windSpeed} m/s`
    if (degrees <= 292.5) return `↑ ${windSpeed} m/s`
    if (degrees <= 337.5) return `↖ ${windSpeed} m/s`
    else return `${windSpeed} m/s` //in case wind direction is not received from the API
}

function openModal(modalID) {
    let overlay = document.getElementById('overlay')
    let modal = document.getElementById(modalID)

    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal() {
    let overlay = document.getElementById('overlay')
    let weatherModal = document.getElementById('singleCityWeatherModal')
    let errorModal = document.getElementById('errorModal')

    overlay.classList.remove('active')
    weatherModal.classList.remove('active')
    errorModal.classList.remove('active')
}

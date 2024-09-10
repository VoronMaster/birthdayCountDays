function timeUntilBirthday(birthday) {
    const today = new Date();
    const thisYear = today.getFullYear();

    // Дата следующего дня рождения в этом году
    let nextBirthday = new Date(thisYear, birthday.getMonth(), birthday.getDate());

    // Если день рождения уже прошел в этом году, используем следующий год
    if (nextBirthday < today) {
        nextBirthday.setFullYear(thisYear + 1);
    }

    // Разница во времени между текущей датой и днем рождения
    const diffInTime = nextBirthday - today;
    
    // Разница в миллисекундах
    let diffInSeconds = Math.floor(diffInTime / 1000);
    let diffInMinutes = Math.floor(diffInSeconds / 60);
    let diffInHours = Math.floor(diffInMinutes / 60);
    let diffInDays = Math.floor(diffInHours / 24);
    
    // Остаток секунд, минут, часов, дней и месяцев
    const seconds = diffInSeconds % 60;
    const minutes = diffInMinutes % 60;
    const hours = diffInHours % 24;
    
    // Рассчитываем месяцы и дни
    let months = nextBirthday.getMonth() - today.getMonth() + 
                 (12 * (nextBirthday.getFullYear() - today.getFullYear()));
    if (months < 0) months += 12; // Коррекция для положительного значения месяцев

    // Учитываем разницу в днях
    if (nextBirthday.getDate() < today.getDate()) {
        months -= 1; 
        const lastMonth = new Date(nextBirthday.getFullYear(), nextBirthday.getMonth() - 1, today.getDate());
        diffInDays = Math.floor((nextBirthday - lastMonth) / (1000 * 60 * 60 * 24));
    } else {
        diffInDays = nextBirthday.getDate() - today.getDate();
    }

    // Вывод оставшегося времени
    return { months, days: diffInDays, hours, minutes, seconds };
}

function displayTimeLeft() {
    const myBirthday = new Date('06-29'); // Укажите вашу дату рождения в формате: 'MM-DD'
    const { months, days, hours, minutes, seconds } = timeUntilBirthday(myBirthday);

    document.querySelector('.main-years span').textContent = 0;
    document.querySelector('.main-months span').textContent = months;
    document.querySelector('.main-days span').textContent = days;
    document.querySelector('.main-hours span').textContent = hours;
    document.querySelector('.main-minutes span').textContent = minutes;
    document.querySelector('.main-seconds span').textContent = seconds;

}

// Функция для обновления каждые 1000 миллисекунд (1 секунда)
setInterval(displayTimeLeft, 1000);

// Инициализация отображения времени
displayTimeLeft();

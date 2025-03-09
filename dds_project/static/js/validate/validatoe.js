const summaInput = document.getElementById('id_summa');
const errorMessage = document.querySelector('.error-message');

console.log('summaInput:', summaInput); // Проверка, что элемент найден
console.log('errorMessage:', errorMessage); // Проверка, что элемент найден

summaInput.addEventListener('input', () => {
    console.log('Событие input сработало'); // Проверка, что событие срабатывает
    const value = summaInput.value.trim();

    // Проверка на пустое поле
    if (value === '') {
        console.log('Поле пустое'); // Отладочное сообщение
        summaInput.classList.add('is-invalid'); // Добавляем Bootstrap класс
        errorMessage.textContent = 'Поле суммы должно быть заполнено'; // Новое сообщение
        errorMessage.style.display = 'block';
        return; // Прерываем выполнение, так как поле пустое
    }

    const numValue = parseFloat(value); // Преобразуем к числу

    // Проверка на число и положительность
    if (isNaN(numValue)) {
        console.log('Введено не число'); // Отладочное сообщение
        summaInput.classList.add('is-invalid'); // Добавляем Bootstrap класс
        errorMessage.textContent = 'Введите число, например 5000';
        errorMessage.style.display = 'block';
    } else if (numValue < 0) {
        console.log('Введено отрицательное число'); // Отладочное сообщение
        summaInput.classList.add('is-invalid'); // Добавляем Bootstrap класс
        errorMessage.textContent = 'Сумма должна быть положительной';
        errorMessage.style.display = 'block';
    } else {
        console.log('Введено корректное значение'); // Отладочное сообщение
        summaInput.classList.remove('is-invalid'); // Удаляем Bootstrap класс
        errorMessage.style.display = 'none';
    }
});

// Добавляем проверку при отправке формы 
const form = document.querySelector('form'); 
if (form) {
    form.addEventListener('submit', (event) => {
        const value = summaInput.value.trim();
        if (value === '') {
            event.preventDefault(); // Отменяем отправку формы
            alert('Поле суммы должно быть заполнено'); // Выводим alert
            summaInput.classList.add('is-invalid'); // Добавляем Bootstrap класс
            errorMessage.textContent = 'Поле суммы должно быть заполнено';
            errorMessage.style.display = 'block';
        }
    });
}
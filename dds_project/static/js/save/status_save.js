document.addEventListener('DOMContentLoaded', function() {
    const addStatusButton = document.querySelector('.add-status-button');
    const tableBody = document.querySelector('#statusTable tbody');

    if (!tableBody) {
        console.error('Таблица не найдена!');
        return;
    }

    addStatusButton.addEventListener('click', function() {
        const newRow = tableBody.insertRow();
        const idCell = newRow.insertCell();
        const nameCell = newRow.insertCell();
        const actionCell = newRow.insertCell();

        idCell.textContent = '...'; // Временно показываем, что id генерируется

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Введите название';
        nameInput.classList.add('form-control');
        nameCell.appendChild(nameInput);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Сохранить';
        saveButton.classList.add('btn', 'btn-success', 'ml-2');
        saveButton.addEventListener('click', function() {
            const newName = nameInput.value.trim();
            if (newName !== '') {
                if (newName.length > 128) {
                    alert("Название статуса не должно превышать 128 символов!");
                    return;
                }

                // Сразу обновляем интерфейс
                nameCell.textContent = newName;
                actionCell.innerHTML = `
                    <a href="#" class="btn btn-outline-info mr-2" role="button">Редактировать</a>
                    <button class="btn btn-outline-danger ml-2">Удалить</button>
                `;

                // Отправляем данные на сервер
                saveStatus(newName, newRow, idCell);
            } else {
                alert("Введите название статуса!");
            }
        });
        actionCell.appendChild(saveButton);
    });

    function saveStatus(name, row, idCell) {
        fetch('/save_status/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ name: name })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Обновляем id, если сервер вернул его
                idCell.textContent = data.id;
            } else {
                // Если сервер вернул ошибку, откатываем изменения
                const nameCell = row.cells[1];
                const actionCell = row.cells[2];

                nameCell.innerHTML = `<input type="text" class="form-control" placeholder="Введите название" value="${name}">`;
                actionCell.innerHTML = `<button class="btn btn-success ml-2">Сохранить</button>`;

                alert('Ошибка при сохранении: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке данных на сервер.');
        });
    }

    // Функция для получения CSRF-токена из cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
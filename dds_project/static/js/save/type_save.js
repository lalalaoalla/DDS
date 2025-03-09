document.addEventListener('DOMContentLoaded', function() {
    const addTypeButton = document.querySelector('.add-type-button');
    const tableBody = document.querySelector('#typeTable tbody');

    if (!tableBody) {
        console.error('Таблица не найдена!');
        return;
    }

    addTypeButton.addEventListener('click', function() {
        const newRow = tableBody.insertRow();
        const idCell = newRow.insertCell();
        const nameCell = newRow.insertCell();
        const actionCell = newRow.insertCell();

        idCell.textContent = '...';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Введите название';
        nameInput.classList.add('form-control');
        nameCell.appendChild(nameInput);

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Сохранить';
        saveButton.classList.add('btn', 'btn-success', 'ml-2');
        saveButton.addEventListener('click', function() {
            const newName = nameInput.value;
            if (newName.trim() !== '') {
                saveType(newName, newRow, idCell);
            } else {
                alert("Введите название типа!");
            }
        });
        actionCell.appendChild(saveButton);
    });

    function saveType(name, row, idCell) {
        fetch('/save_type/', {
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
                idCell.textContent = data.id;
                row.cells[1].textContent = name;
                row.cells[2].innerHTML = `
                    <a href="#" class="btn btn-outline-info mr-2" role="button">Редактировать</a>
                    <button class="btn btn-outline-danger ml-2">Удалить</button>
                `;
            } else {
                alert('Ошибка при сохранении: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке данных на сервер.');
        });
    }

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
document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('statusTable');

    table.addEventListener('click', function(event) {
        const target = event.target;
        const row = target.closest('tr');

        if (target.classList.contains('edit-button')) {
            handleEdit(row);
        } else if (target.classList.contains('save-button')) {
            handleSave(row);
        } else if (target.classList.contains('cancel-button')) {
            handleCancel(row);
        }
    });

    function handleEdit(row) {
        const id = row.dataset.statusId;
        const name = row.querySelector('.status-name').textContent;

        // Заменяем содержимое ячеек на форму редактирования
        row.querySelector('.status-name').innerHTML = `<input type="text" class="form-control edit-name-input" value="${name}">`;
        row.querySelector('.button-container').innerHTML = `
            <button class="btn btn-success save-button">Сохранить</button>
        `;
    }

    function handleSave(row) {
        const id = row.dataset.statusId;
        const newName = row.querySelector('.edit-name-input').value;

        fetch(`/update_status/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') 
            },
            body: JSON.stringify({ name: newName })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Обновляем отображение в таблице
                row.querySelector('.status-name').textContent = newName;
                row.querySelector('.button-container').innerHTML = `
                    <a href="#" class="btn btn-outline-info mr-2 edit-button" role="button">Редактировать</a>
                    <button class="btn btn-outline-danger ml-2 delete-button">Удалить</button>
                `;
            } else {
                alert('Ошибка при сохранении: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке запроса.');
        });
    }

    function handleCancel(row) {
        const id = row.dataset.statusId;
        const name = row.querySelector('.edit-name-input').value;

        // Возвращаем отображение в таблице
        row.querySelector('.status-name').textContent = name;
        row.querySelector('.button-container').innerHTML = `
            <a href="#" class="btn btn-outline-info mr-2 edit-button" role="button">Редактировать</a>
            <button class="btn btn-outline-danger ml-2 delete-button">Удалить</button>
        `;
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
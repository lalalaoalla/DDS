document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#category-table-body tbody');
    
    if (!window.typeData) {
        console.error("Данные о типах не переданы из Django.");
        return; 
    }

    const typeData = window.typeData;

    // Получаем CSRF-токен
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-button')) {
            const row = event.target.closest('tr');
            const id = row.dataset.id;
            const nameCell = row.querySelector('.name-column');
            const typeCell = row.querySelector('.type-column');
            const actionsCell = row.querySelector('.button-container');

            // Замена содержимого ячейки "Название" на поле ввода
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = nameCell.textContent;
            nameInput.classList.add('form-control');
            nameCell.innerHTML = '';
            nameCell.appendChild(nameInput);

            // Замена содержимого ячейки "Тип" на выпадающий список
            const typeSelect = document.createElement('select');
            typeSelect.classList.add('form-control');

            const currentTypeId = typeCell.textContent.trim();
            for (const [typeId, typeName] of Object.entries(typeData)) {
                const option = document.createElement('option');
                option.value = typeId;
                option.text = typeName;

                if (typeId === currentTypeId) {
                    option.selected = true;
                }

                typeSelect.appendChild(option);
            }

            typeCell.innerHTML = '';
            typeCell.appendChild(typeSelect);

            // Создание кнопки "Сохранить"
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Сохранить';
            saveButton.classList.add('btn', 'btn-outline-success', 'mr-2');

            saveButton.addEventListener('click', () => {
                const newName = nameInput.value;
                const newTypeId = parseInt(typeSelect.value);

                fetch('/update_category/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify({ id: id, name: newName, type_id: newTypeId }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        nameCell.textContent = newName;
                        typeCell.textContent = typeData[newTypeId];
                        actionsCell.innerHTML = '<button class="btn btn-outline-info mr-2 edit-button">Редактировать</button><button class="btn btn-outline-danger ml-2 delete-button">Удалить</button>';
                    } else {
                        alert('Ошибка при сохранении: ' + data.error);
                    }
                })
                .catch(error => {
                    console.error('Ошибка при отправке запроса:', error);
                });
            });

            // Удаляем старые кнопки и добавляем кнопку "Сохранить"
            actionsCell.innerHTML = '';
            actionsCell.appendChild(saveButton);

            
            const cancelButton = document.createElement('button');
            cancelButton.classList.add('btn', 'btn-outline-secondary', 'ml-2');
            cancelButton.addEventListener('click', () => {
                nameCell.textContent = nameInput.value;
                typeCell.textContent = typeData[typeSelect.value];
                actionsCell.innerHTML = '<button class="btn btn-outline-info mr-2 edit-button">Редактировать</button><button class="btn btn-outline-danger ml-2 delete-button">Удалить</button>';
            });
            actionsCell.appendChild(cancelButton);
        }
    });
});
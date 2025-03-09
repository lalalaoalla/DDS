document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#subcategory-table-body tbody');
    
    if (!window.categoryData) {
        console.error("Данные о категориях не переданы из Django.");
        return; 
    }

    const categoryData = window.categoryData;

    // Получаем CSRF-токен
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-button')) {
            const row = event.target.closest('tr');
            const id = row.dataset.id;
            const nameCell = row.querySelector('.name-column');
            const categoryCell = row.querySelector('.category-column');
            const actionsCell = row.querySelector('.button-container');

            // Замена содержимого ячейки "Название" на поле ввода
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = nameCell.textContent;
            nameInput.classList.add('form-control');
            nameCell.innerHTML = '';
            nameCell.appendChild(nameInput);

            // Замена содержимого ячейки "Категория" на выпадающий список
            const categorySelect = document.createElement('select');
            categorySelect.classList.add('form-control');

            const currentCategoryId = categoryCell.textContent.trim();
            for (const [categoryId, categoryName] of Object.entries(categoryData)) {
                const option = document.createElement('option');
                option.value = categoryId;
                option.text = categoryName;

                if (categoryId === currentCategoryId) {
                    option.selected = true;
                }

                categorySelect.appendChild(option);
            }

            categoryCell.innerHTML = '';
            categoryCell.appendChild(categorySelect);

            // Создание кнопки "Сохранить"
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Сохранить';
            saveButton.classList.add('btn', 'btn-outline-success', 'mr-2');

            saveButton.addEventListener('click', () => {
                const newName = nameInput.value;
                const newCategoryId = parseInt(categorySelect.value);

                fetch('/update_subcategory/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify({ id: id, name: newName, category_id: newCategoryId }),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        nameCell.textContent = newName;
                        categoryCell.textContent = categoryData[newCategoryId.toString()];
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
                categoryCell.textContent = categoryData[categorySelect.value];
                actionsCell.innerHTML = '<button class="btn btn-outline-info mr-2 edit-button">Редактировать</button><button class="btn btn-outline-danger ml-2 delete-button">Удалить</button>';
            });
            actionsCell.appendChild(cancelButton);
        }
    });
});
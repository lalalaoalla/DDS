document.addEventListener('DOMContentLoaded', function() {
    const addCategoryButton = document.querySelector('.add-category-button');
    const categoryTableBody = document.getElementById('category-table-body');

    if (!categoryTableBody) {
        console.error('Элемент category-table-body не найден!');
        return;
    }

    addCategoryButton.addEventListener('click', () => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td></td>
            <td><input type="text" id="newCategoryName" class="form-control"></td>
            <td>
                <select id="newCategoryType" class="form-control">
                    ${typeOptions.map(type => `<option value="${type.id}">${type.name}</option>`).join('')}
                </select>
            </td>
            <td><button class="save-category-button btn btn-outline-success">Сохранить</button></td>
        `;
        categoryTableBody.appendChild(newRow);

        newRow.querySelector('.save-category-button').addEventListener('click', () => {
            const name = newRow.querySelector('#newCategoryName').value;
            const typeId = newRow.querySelector('#newCategoryType').value;

            // Меняем кнопку "Сохранить" на "Редактировать" и "Удалить" сразу после нажатия
            newRow.innerHTML = `
                <td></td>
                <td>${name}</td>
                <td>${newRow.querySelector('#newCategoryType').options[newRow.querySelector('#newCategoryType').selectedIndex].text}</td>
                <td class="button-container">
                    <a href="#" class="btn btn-outline-info mr-2" role="button">Редактировать</a>
                    <button class="btn btn-outline-danger ml-2">Удалить</button>
                </td>
            `;

            const csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            fetch('/save_category/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({ name: name, type_id: typeId }),
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.error || 'Ошибка при сохранении');
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Обновляем ID категории после успешного сохранения
                    newRow.querySelector('td:first-child').textContent = data.id;
                } else {
                    //alert('Ошибка при сохранении категории!');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                //alert('Ошибка при сохранении категории: ' + error.message);
            });
        });
    });
});
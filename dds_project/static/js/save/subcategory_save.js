document.addEventListener('DOMContentLoaded', function() {
    const addCategoryButton = document.querySelector('.add-subcategory-button');
    const categoryTableBody = document.getElementById('subcategory-table-body');

    if (!categoryTableBody) {
        console.error('Элемент subcategory-table-body не найден!');
        return;
    }

    addCategoryButton.addEventListener('click', () => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td></td>
            <td><input type="text" id="newCategoryName" class="form-control"></td>
            <td>
                <select id="newCategoryType" class="form-control">
                    ${categoryOptions.map(category => `<option value="${category.id}">${category.name}</option>`).join('')}
                </select>
            </td>
            <td><button class="save-category-button btn btn-outline-success">Сохранить</button></td>
        `;
        categoryTableBody.appendChild(newRow);

        newRow.querySelector('.save-category-button').addEventListener('click', () => {
            const name = newRow.querySelector('#newCategoryName').value;
            const categoryId = newRow.querySelector('#newCategoryType').value;

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

            
            fetch('/save_subcategory/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') 
                },
                body: JSON.stringify({ name: name, category_id: categoryId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Обновляем id подкатегории после успешного сохранения
                    newRow.querySelector('td:first-child').textContent = data.id;
                } else {
                    //alert('Ошибка при сохранении подкатегории!');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                //alert('Ошибка при сохранении подкатегории!');
            });
        });
    });
});

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
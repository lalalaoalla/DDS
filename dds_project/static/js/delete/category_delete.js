document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('category-table-body');

    tableBody.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-category-button')) {
            event.preventDefault();
            const row = event.target.closest('tr');
            const categoryId = row.dataset.id;  

            if (!categoryId) {
                console.error("Category ID not found!");
                alert('Ошибка: ID категории не найден.');
                return;
            }

            try {
                const csrftoken = getCookie('csrftoken');
                const response = await fetch(`/delete_category/${categoryId}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMessage = errorData.error || `Ошибка сервера (${response.status})`;
                    console.error("Ошибка при удалении:", errorMessage, errorData);
                    alert(`Ошибка при удалении: ${errorMessage}`);
                    return;
                }

                const data = await response.json();
                if (data.success) {
                    row.remove();
                } else {
                    console.error("Ошибка при удалении:", data);
                    alert('Ошибка при удалении: ' + (data.error || 'Неизвестная ошибка'));
                }
            } catch (error) {
                console.error("Ошибка при удалении:", error);
                alert('Ошибка при удалении: ' + error.message);
            }
        }
    });

    // Функция для получения CSRF-токена из куки
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
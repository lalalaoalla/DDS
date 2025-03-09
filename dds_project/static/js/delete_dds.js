document.addEventListener('DOMContentLoaded', () => {
    const csrftoken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (!csrftoken) {
        console.error("CSRF token not found!");
        return; // Прерываем выполнение, если токен не найден
    }

    const tableBody = document.getElementById('dds-table')?.querySelector('tbody');
    if (!tableBody) {
        console.error("Table body not found!");
        return; // Прерываем выполнение, если таблица не найдена
    }

    tableBody.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-button')) {
            event.preventDefault();
            const row = event.target.closest('tr');
            const id = row?.dataset.id;

            if (!id) {
                console.error("Row ID not found!");
                alert('Ошибка: ID записи не найден.');
                return;
            }

            try {
                const response = await fetch(`/delete_dds/${id}/`, {
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
                    //alert('Запись успешно удалена');
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
});

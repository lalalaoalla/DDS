$(document).ready(function() {
    $('#filter-form').on('submit', function(event) {
        event.preventDefault();  // Отменяем стандартную отправку формы
        console.log("Форма отправлена");
        console.log("AJAX-запрос отправлен");


        // Отключаем кнопку, чтобы предотвратить множественные нажатия
        $('#filter-button').prop('disabled', true);

        // Получаем данные из формы
        const formData = $(this).serialize();

        // Отправляем AJAX-запрос
        $.ajax({
            url: '',  // Оставляем пустым, чтобы отправить на текущий URL
            type: 'GET',
            data: formData,
            success: function(response) {
                // Обновляем только таблицу с данными
                $('#dds-table').html($(response).find('#dds-table').html());
            },
            error: function(xhr, status, error) {
                console.error('Ошибка при фильтрации:', error);
            },
            complete: function() {
                // Включаем кнопку после завершения запроса
                $('#filter-button').prop('disabled', false);
            }
        });
    });
});
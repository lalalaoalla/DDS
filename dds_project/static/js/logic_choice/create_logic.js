const typeddsSelect = document.getElementById('id_typedds');
    const categorySelect = document.getElementById('id_category');
    const subcategorySelect = document.getElementById('id_subcategory');

    typeddsSelect.addEventListener('change', function() {
        fetch(`/get_categories/?typedds_id=${this.value}`)
            .then(response => response.json())
            .then(data => {
                categorySelect.innerHTML = '';
                data.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.text = category.name;
                    categorySelect.appendChild(option);
                });
                subcategorySelect.innerHTML = '';
            });
    });

    categorySelect.addEventListener('change', function() {
        fetch(`/get_subcategories/?category_id=${this.value}`)
            .then(response => response.json())
            .then(data => {
                subcategorySelect.innerHTML = '';
                data.forEach(subcategory => {
                    const option = document.createElement('option');
                    option.value = subcategory.id;
                    option.text = subcategory.name;
                    subcategorySelect.appendChild(option);
                });
            });
    });
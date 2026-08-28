document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-btn');
    const toggleButtons = document.querySelectorAll('.btn-toggle');

    // 1. Carregar preferências do usuário (Modo Escuro)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeBtn.innerHTML = '☀️ Modo Claro';
    }

    // 2. Função para alternar entre Modo Claro e Escuro
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeBtn.innerHTML = isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro';
        
        // Salva a preferência
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // 3. Função para expandir e recolher os textos dos cards
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const textElement = document.getElementById(targetId);
            
            textElement.classList.toggle('expanded');
            const isExpanded = textElement.classList.contains('expanded');

            button.innerHTML = isExpanded 
                ? '<span>Ler menos</span> &uparrow;' 
                : '<span>Ler mais</span> &downarrow;';
        });
    });
});
// Función para cambiar entre menús
function openMenu(menuId) {
    // Ocultar todos los menús
    const menus = document.querySelectorAll('.menu');
    menus.forEach(menu => {
        menu.classList.remove('active');  // Quitar la clase activa
    });

    // Mostrar el menú seleccionado
    const selectedMenu = document.getElementById(menuId);
    if (selectedMenu) {
        selectedMenu.classList.add('active');  // Agregar la clase activa
    }
}

// Función para reproducir el sonido al pasar el mouse por los botones
function playHoverSound() {
    const hoverSound = document.getElementById("hover-sound");
    hoverSound.currentTime = 0; // Reiniciar el sonido por si se reproduce varias veces
    hoverSound.play();
}

// Función para reproducir el sonido al hacer clic en los botones
function playClickSound() {
    const clickSound = document.getElementById("click-sound");
    clickSound.currentTime = 0; // Reiniciar el sonido por si se reproduce varias veces
    clickSound.play();
}

// Iniciar música de fondo al hacer clic en cualquier parte de la página
document.body.addEventListener('click', function() {
    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.play(); // Reproducir música si no está sonando
});

export const generarUsuarioAleatorio = (longitudMaxima: number = 10): string => {
    const adjetivos = [
        'Valiente', 'Listo', 'Brillante', 'Poderoso', 'Rápido', 'Curioso', 'Gentil', 'Feroz',
        'Noble', 'Feliz', 'Atrevido', 'Veloz', 'Salvaje', 'Calmado', 'Leal', 'Juguetón', 'Intrépido',
        'Tranquilo', 'Amistoso', 'Afortunado', 'Gracioso', 'Ingenioso', 'Audaz', 'Agudo', 'Sabio',
        'Encantador', 'Enérgico', 'Orgulloso', 'Épico', 'Sereno', 'Alegre', 'Vívido', 'Animado',
        'Vigilante', 'Paciente', 'Brillante', 'Místico', 'Radiante', 'Estable', 'Picante',
        'Ambicioso', 'Deslumbrante', 'Vibrante', 'Atrevido', 'Intrepido', 'Aventurero', 'Astuto',
        'Ingenioso', 'Dinámico', 'Heroico', 'Vivo', 'Reluciente', 'Innovador', 'Elegante', 
        'Magnético', 'Estelar', 'Resiliente', 'Humilde', 'Gallardo', 'Creativo', 'Diligente', 
        'Majestuoso', 'Valeroso', 'Optimista', 'Zafado', 'Espíritu', 'Rudo', 'Simpático', 'Ágil'
    ];

    const sustantivos = [
        "León", "Tigre", "Oso", "Águila", "Tiburón", "Lobo", "Halcón", "Dragón", "Pantera", "Falcón"
    ];

    const elementoAleatorio = (array: string[]): string => {
        return array[Math.floor(Math.random() * array.length)];
    };

    let usuario = `${elementoAleatorio(adjetivos)}${elementoAleatorio(sustantivos)}${Math.floor(Math.random() * 10000)}`;

    // Si el usuario generado excede longitudMaxima, lo recorta
    if (usuario.length > longitudMaxima) {
        usuario = usuario.substring(0, longitudMaxima);
    }

    return usuario;
};

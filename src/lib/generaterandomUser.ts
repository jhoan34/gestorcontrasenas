

export const generateRandomUser = (length = 5) => {
    const adjectives = [
        'Brave', 'Clever', 'Bright', 'Mighty', 'Quick', 'Curious', 'Gentle', 'Fierce',
        'Noble', 'Happy', 'Bold', 'Swift', 'Wild', 'Calm', 'Loyal', 'Playful', 'Fearless',
        'Quiet', 'Friendly', 'Lucky', 'Graceful', 'Witty', 'Daring', 'Sharp', 'Wise',
        'Charming', 'Energetic', 'Proud', 'Epic', 'Serene', 'Joyful', 'Vivid', 'Cheerful',
        'Vigilant', 'Patient', 'Brilliant', 'Mystic', 'Radiant', 'Steady', 'Zesty',
        'Ambitious', 'Dazzling', 'Bold', 'Vibrant', 'Sassy', 'Intrepid', 'Adventurous',
        'Cunning', 'Crafty', 'Dynamic', 'Heroic', 'Lively', 'Sparkling', 'Innovative',
        'Elegant', 'Fearless', 'Magnetic', 'Stellar', 'Resilient', 'Humble', 'Gallant',
        'Artful', 'Diligent', 'Funky', 'Majestic', 'Valiant', 'Savvy', 'Jolly', 'Radiant',
        'Nimble', 'Spirited', 'Tough', 'Epic', 'Vivid', 'Optimistic', 'Zany', 'Courageous'
    ];

    const nouns = [
        "lion",
        "Tiger",
        "Bear",
        "Eagle",
        "shark",
        "Wolf",
        "hawk",
        "Dragon",
        "Panther",
        "Falcon"
    ]

    const randomItem =  (arrayy : any) => {
        return arrayy[Math.floor(Math.random() * arrayy.length)]
    }
    // Código para generar un nombre de usuario utilizando adjetivos aleatorios
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    let username = ""
    username += randomItem(adjectives)
    username += randomItem(nouns)
    username += Math.floor(Math.random() * 10000)

    if(username.length > length){
        username = username.substring(0 , length)
    }

    return username
};
